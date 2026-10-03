package com.email_writer_sb;

import java.util.List;

public class EmailActionItemResponse {

    private List<String> actionItems;

    public EmailActionItemResponse() {
    }

    public EmailActionItemResponse(List<String> actionItems) {
        this.actionItems = actionItems;
    }

    public List<String> getActionItems() {
        return actionItems;
    }

    public void setActionItems(List<String> actionItems) {
        this.actionItems = actionItems;
    }
}
