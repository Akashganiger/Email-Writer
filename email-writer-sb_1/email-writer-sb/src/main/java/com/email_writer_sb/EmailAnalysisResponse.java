package com.email_writer_sb;

public class EmailAnalysisResponse {

    private String intent;
    private String priority;
    private String reason;

    public EmailAnalysisResponse() {
    }

    public EmailAnalysisResponse(String intent, String priority, String reason) {
        this.intent = intent;
        this.priority = priority;
        this.reason = reason;
    }

    public String getIntent() {
        return intent;
    }

    public void setIntent(String intent) {
        this.intent = intent;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
