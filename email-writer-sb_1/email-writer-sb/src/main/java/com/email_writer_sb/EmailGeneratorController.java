package com.email_writer_sb;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response=emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeEmail(@RequestBody(required = false) EmailSummaryRequest request) {
        try {
            return ResponseEntity.ok(emailGeneratorService.summarizeEmail(request));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @PostMapping("/smart-replies")
    public ResponseEntity<SmartReplyResponse> generateSmartReplies(
            @RequestBody(required = false) SmartReplyRequest request) {
        try {
            return ResponseEntity.ok(emailGeneratorService.generateSmartReplies(request));
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception);
        }
    }

    @PostMapping("/action-items")
    public ResponseEntity<EmailActionItemResponse> extractActionItems(
            @RequestBody EmailActionItemRequest request) {
        return ResponseEntity.ok(emailGeneratorService.extractActionItems(request));
    }

    @PostMapping("/analyze")
    public ResponseEntity<EmailAnalysisResponse> analyzeEmail(
            @RequestBody EmailAnalysisRequest request) {
        return ResponseEntity.ok(emailGeneratorService.analyzeEmail(request));
    }
}
