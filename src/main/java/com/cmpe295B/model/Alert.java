package com.cmpe295B.model;

import java.time.LocalDateTime;

public class Alert {
    private String type;
    private String message;
    private LocalDateTime timestamp;
    private String severity;
    private String id; // New field
    private String location; // New field

    // Constructor
    public Alert(String type, String message, LocalDateTime timestamp, String severity, String id, String location) {
        this.type = type;
        this.message = message;
        this.timestamp = timestamp;
        this.severity = severity;
        this.id = id;
        this.location = location;
    }

    // Getters and Setters
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
