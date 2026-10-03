package com.email_writer_sb;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

        return sendPromptToGemini(prompt, "Failed to generate email reply: ");
    }

    public String summarizeEmail(EmailSummaryRequest request) {
        if (request == null || request.getEmailContent() == null
                || request.getEmailContent().isBlank()) {
            throw new IllegalArgumentException(
                    "emailContent must not be null or empty"
            );
        }

        String prompt = buildSummaryPrompt(request.getEmailContent());
        return sendPromptToGemini(prompt, "Failed to summarize email: ");
    }

    public SmartReplyResponse generateSmartReplies(SmartReplyRequest request) {
        if (request == null || request.getEmailContent() == null
                || request.getEmailContent().isBlank()) {
            throw new IllegalArgumentException(
                    "emailContent must not be null or empty"
            );
        }

        String prompt = buildSmartReplyPrompt(request.getEmailContent());
        String response = sendPromptToGemini(prompt, "Failed to generate smart replies: ");
        return parseSmartReplyResponse(response);
    }

    public EmailActionItemResponse extractActionItems(EmailActionItemRequest request) {
        if (request == null || request.getEmailContent() == null
                || request.getEmailContent().isBlank()) {
            throw new RuntimeException("Email content cannot be empty");
        }

        String prompt = buildActionItemPrompt(request.getEmailContent());
        String response = sendPromptToGemini(prompt, "Failed to extract action items: ");
        return parseActionItemResponse(response);
    }

    public EmailAnalysisResponse analyzeEmail(EmailAnalysisRequest request) {
        if (request == null || request.getEmailContent() == null
                || request.getEmailContent().isBlank()) {
            throw new RuntimeException("Email content cannot be empty");
        }

        String prompt = buildAnalysisPrompt(request.getEmailContent());
        String response = sendPromptToGemini(prompt, "Failed to analyze email: ");
        return parseAnalysisResponse(response);
    }

    private String sendPromptToGemini(String prompt, String failureMessage) {

        try {

            ObjectMapper mapper = new ObjectMapper();

            // Let Jackson handle JSON escaping correctly
            Map<String, Object> request = Map.of(
                    "model", "gemini-3.8-flash",
                    "input", prompt
            );

            String requestBody = mapper.writeValueAsString(request);

            System.out.println("===== GEMINI REQUEST =====");
            System.out.println(requestBody);
            System.out.println("==========================");

            String response = webClient.post()
                    .uri("")
                    .header("x-goog-api-key", apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .onStatus(
                            status -> status.value() == 429,
                            clientResponse -> clientResponse
                                    .bodyToMono(String.class)
                                    .map(errorBody ->
                                            new RuntimeException(
                                                    "AI service rate limit reached. Please try again later."
                                            )
                                    )
                    )
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

        } catch (Exception e) {

            if (e instanceof RuntimeException runtimeException
                    && "AI service rate limit reached. Please try again later."
                    .equals(runtimeException.getMessage())) {
                throw runtimeException;
            }

            throw new RuntimeException(
                    failureMessage + e.getMessage(),
                    e
            );
        }
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

        String tone = emailRequest.getTone();
        if (tone == null || tone.isBlank()) {
            tone = "Professional";
        }

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
                Write an email reply to the original email below. Match the selected tone:
                - Professional: clear, courteous, and polished, with a business-appropriate level of detail.
                - Friendly: warm, approachable, and conversational while remaining respectful.
                - Formal: highly courteous and structured, using formal wording and avoiding casual expressions.
                - Concise: brief and direct, including only what is necessary to respond.

                Requirements:
                - Reply directly to the original email and preserve its important information.
                - Do not invent facts, commitments, or information not present in the original email.
                - Do not mention AI or say that the email is missing.
                - Do not ask the user to paste the email again.
                - Return only the email reply, with no explanations or other commentary.

                """);

        prompt.append("Selected tone: ")
                .append(tone)
                .append("\n\n");

        prompt.append("Original Email:\n")
                .append(emailRequest.getEmailContent())
                .append("\n\n");

        prompt.append("Write the appropriate reply now.");

        return prompt.toString();
    }

    private String buildSummaryPrompt(String emailContent) {
        return """
                Summarize the provided email clearly and concisely.

                Requirements:
                - Identify the main purpose of the email.
                - Include important dates, deadlines, names, numbers, and requests when present.
                - Preserve important information from the email.
                - Do not invent information or add opinions.
                - Do not mention that the summary was generated by AI.
                - Use simple and easy-to-understand language.
                - Keep the summary significantly shorter than the original email.
                - Return only the summary.

                Email to summarize:
                %s
                """.formatted(emailContent);
    }

    private String buildSmartReplyPrompt(String emailContent) {
        return """
                Analyze the original email and generate exactly 3 possible reply suggestions.

                Requirements:
                - Keep each suggestion short and natural.
                - Make each suggestion meaningfully different from the others.
                - Make each suggestion appropriate to the context of the original email.
                - Keep the replies professional and useful.
                - Do not invent information.
                - Do not mention that the response was generated by AI.
                - Do not include explanations.
                - Do not include numbering such as "1.", "2.", or "3." inside the suggestion text.
                - Return only a simple JSON array containing exactly 3 strings.

                Original email:
                %s
                """.formatted(emailContent);
    }

    private String buildActionItemPrompt(String emailContent) {
        return """
                You are an AI email assistant.

                Analyze the email below and extract the specific actions or tasks that the recipient needs to perform.

                Rules:
                - Return only actions/tasks that are explicitly requested or clearly required.
                - Do not invent tasks.
                - Do not include general information or statements that are not actions.
                - If there are no action items, return an empty JSON array.
                - Return ONLY a valid JSON array of strings.
                - Do not use Markdown.
                - Do not include ```json or ``` around the response.
                - Keep each action item concise and clear.

                Return format example:
                [
                  "Confirm attendance for the meeting",
                  "Send the requested report",
                  "Review the attached document"
                ]

                Original Email:
                %s

                Return the action items now.
                """.formatted(emailContent);
    }

    private String buildAnalysisPrompt(String emailContent) {
        return """
                You are an AI email assistant.

                Analyze the following email and determine its intent and priority.

                INTENT:
                Choose exactly ONE of these intent values:
                - REQUEST
                - QUESTION
                - INFORMATION
                - MEETING
                - FOLLOW_UP
                - COMPLAINT
                - THANK_YOU
                - OTHER

                Definitions:
                REQUEST: The sender is asking the recipient to perform an action.
                QUESTION: The sender primarily wants an answer or information.
                INFORMATION: The sender is mainly providing information without requesting an action.
                MEETING: The main purpose is scheduling, changing, confirming, or discussing a meeting or appointment.
                FOLLOW_UP: The sender is following up on a previous communication, request, or pending matter.
                COMPLAINT: The sender is expressing dissatisfaction or reporting a problem.
                THANK_YOU: The primary purpose is thanking the recipient.
                OTHER: Use this when none of the above categories clearly applies.

                PRIORITY:
                Choose exactly ONE:
                - HIGH
                - MEDIUM
                - LOW

                Priority guidelines:
                HIGH: Use when the email indicates urgency, an immediate deadline, a critical issue, an important business/customer problem, or a request requiring prompt attention.
                MEDIUM: Use when the email requires attention or action but does not indicate immediate urgency.
                LOW: Use when the email is informational, non-urgent, casual, or does not require immediate action.

                IMPORTANT:
                - Determine priority only from information present in the email.
                - Do not invent deadlines or urgency.
                - Do not assume an email is high priority simply because it is a business email.
                - Return a short reason explaining the classification.
                - Return ONLY valid JSON.
                - Do not use Markdown.
                - Do not include ```json or ``` around the response.

                Return exactly this JSON structure:
                {
                  "intent": "REQUEST",
                  "priority": "MEDIUM",
                  "reason": "The sender is asking the recipient to complete a task without indicating an immediate deadline."
                }

                Original Email:
                %s

                Analyze the email now.
                """.formatted(emailContent);
    }

    private EmailAnalysisResponse parseAnalysisResponse(String response) {
        try {
            String json = removeMarkdownCodeFence(response);
            JsonNode analysisNode = new ObjectMapper().readTree(json);
            if (analysisNode == null || !analysisNode.isObject()) {
                throw new RuntimeException(
                        "Gemini email analysis response must be a JSON object"
                );
            }

            JsonNode intentNode = analysisNode.path("intent");
            JsonNode priorityNode = analysisNode.path("priority");
            JsonNode reasonNode = analysisNode.path("reason");
            if (!intentNode.isTextual() || !priorityNode.isTextual()
                    || !reasonNode.isTextual()
                    || intentNode.asText().isBlank()
                    || priorityNode.asText().isBlank()
                    || reasonNode.asText().isBlank()) {
                throw new RuntimeException(
                        "Gemini email analysis response must include non-empty intent, priority, and reason strings"
                );
            }

            String intent = intentNode.asText();
            String priority = priorityNode.asText();
            if (!List.of("REQUEST", "QUESTION", "INFORMATION", "MEETING",
                    "FOLLOW_UP", "COMPLAINT", "THANK_YOU", "OTHER").contains(intent)) {
                throw new RuntimeException(
                        "Gemini returned an unsupported email intent: " + intent
                );
            }
            if (!List.of("HIGH", "MEDIUM", "LOW").contains(priority)) {
                throw new RuntimeException(
                        "Gemini returned an unsupported email priority: " + priority
                );
            }

            return new EmailAnalysisResponse(intent, priority, reasonNode.asText());
        } catch (RuntimeException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new RuntimeException(
                    "Failed to parse Gemini email analysis response as JSON",
                    exception
            );
        }
    }

    private EmailActionItemResponse parseActionItemResponse(String response) {
        try {
            String json = removeMarkdownCodeFence(response);
            JsonNode actionItemsNode = new ObjectMapper().readTree(json);
            if (actionItemsNode == null || !actionItemsNode.isArray()) {
                throw new RuntimeException(
                        "Gemini action item response must be a JSON array of strings"
                );
            }

            List<String> actionItems = new ArrayList<>();
            for (JsonNode actionItemNode : actionItemsNode) {
                if (!actionItemNode.isTextual() || actionItemNode.asText().isBlank()) {
                    throw new RuntimeException(
                            "Gemini action item response must contain only non-empty strings"
                    );
                }
                actionItems.add(actionItemNode.asText());
            }

            return new EmailActionItemResponse(actionItems);
        } catch (RuntimeException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new RuntimeException(
                    "Failed to parse Gemini action item response as a JSON array of strings",
                    exception
            );
        }
    }

    private String removeMarkdownCodeFence(String response) {
        if (response == null || response.isBlank()) {
            throw new RuntimeException("Gemini returned an empty action item response");
        }

        String text = response.trim();
        if (!text.startsWith("```")) {
            return text;
        }

        int firstLineEnd = text.indexOf('\n');
        int closingFence = text.lastIndexOf("```");
        if (firstLineEnd < 0 || closingFence <= firstLineEnd
                || !text.substring(closingFence + 3).isBlank()) {
            throw new RuntimeException(
                    "Gemini returned an invalid Markdown code fence for action items"
            );
        }

        return text.substring(firstLineEnd + 1, closingFence).trim();
    }

    private SmartReplyResponse parseSmartReplyResponse(String response) {
        try {
            JsonNode suggestionsNode = new ObjectMapper().readTree(response);
            if (!suggestionsNode.isArray() || suggestionsNode.size() != 3) {
                throw new RuntimeException(
                        "Gemini smart reply response must be a JSON array containing exactly 3 suggestions"
                );
            }

            List<String> suggestions = new ArrayList<>();
            for (JsonNode suggestionNode : suggestionsNode) {
                if (!suggestionNode.isTextual() || suggestionNode.asText().isBlank()) {
                    throw new RuntimeException(
                            "Gemini smart reply response must contain 3 non-empty strings"
                    );
                }
                suggestions.add(suggestionNode.asText());
            }

            SmartReplyResponse smartReplyResponse = new SmartReplyResponse();
            smartReplyResponse.setSuggestions(suggestions);
            return smartReplyResponse;
        } catch (RuntimeException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new RuntimeException(
                    "Failed to parse Gemini smart reply response as a JSON array of exactly 3 strings",
                    exception
            );
        }
    }
}