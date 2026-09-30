package com.email_writer_sb;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final String apiKey;

    public EmailGeneratorService(
            @Value("${gemini.api.url}") String baseUrl,
            @Value("${gemini.api.key}") String geminiApiKey) {

        this.apiKey = geminiApiKey;

        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {

        String prompt = buildPrompt(emailRequest);

        String requestBody = String.format("""
                        {
                          "model": "gemini-3.8-flash",
                          "input": "%s"
                        }
                        """,
                prompt
                        .replace("\\", "\\\\")
                        .replace("\"", "\\\"")
                        .replace("\n", "\\n")
                        .replace("\r", "\\r")
        );

        String response = webClient.post()
                .uri("")
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(
                        status -> status.isError(),
                        clientResponse -> clientResponse
                                .bodyToMono(String.class)
                                .map(errorBody ->
                                        new RuntimeException(
                                                "Gemini API Error: " + errorBody
                                        )
                                )
                )
                .bodyToMono(String.class)
                .retryWhen(
                        reactor.util.retry.Retry
                                .backoff(3, java.time.Duration.ofSeconds(2))
                                .filter(error ->
                                        error instanceof RuntimeException
                                                && error.getMessage() != null
                                                && error.getMessage().contains("service_unavailable")
                                )
                )
                .block();

        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {

        if (response == null || response.isBlank()) {
            throw new RuntimeException(
                    "Gemini returned an empty response"
            );
        }

        try {

            ObjectMapper mapper = new ObjectMapper();

            JsonNode root = mapper.readTree(response);

            System.out.println("===== GEMINI RESPONSE =====");
            System.out.println(root.toPrettyString());
            System.out.println("===========================");

            JsonNode steps = root.path("steps");

            if (!steps.isArray()) {
                throw new RuntimeException(
                        "Gemini response does not contain a valid 'steps' array"
                );
            }

            /*
             * Find the step whose type is "model_output".
             */
            for (JsonNode step : steps) {

                String stepType = step.path("type").asText();

                if ("model_output".equals(stepType)) {

                    JsonNode content = step.path("content");

                    if (!content.isArray()) {
                        throw new RuntimeException(
                                "Gemini model_output does not contain a valid content array"
                        );
                    }

                    /*
                     * content is an array.
                     * Find the text content inside it.
                     */
                    for (JsonNode contentBlock : content) {

                        String contentType =
                                contentBlock.path("type").asText();

                        if ("text".equals(contentType)) {

                            String text =
                                    contentBlock.path("text").asText();

                            if (!text.isBlank()) {
                                return text;
                            }
                        }
                    }
                }
            }

            throw new RuntimeException(
                    "No text response found in Gemini model_output"
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse Gemini response: " + response,
                    e
            );
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
                You are an AI email assistant.
                
                Generate a professional and natural reply to the email provided below.
                
                Instructions:
                - Reply directly to the original email.
                - Do not say that the email is missing.
                - Do not ask the user to paste the email again.
                - Do not mention that you are an AI.
                - Keep the reply concise and professional.
                - Match the requested tone.
                - Do not invent information that is not present in the original email.
                - Return only the email reply, without explanations.
                
                """);

        if (emailRequest.getTone() != null
                && !emailRequest.getTone().isBlank()) {

            prompt.append("Tone: ")
                    .append(emailRequest.getTone())
                    .append("\n\n");
        }

        prompt.append("Original Email:\n")
                .append(emailRequest.getEmailContent())
                .append("\n\n");

        prompt.append("Write the appropriate reply now.");

        return prompt.toString();
    }
}