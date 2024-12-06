package com.cmpe295B.model;

public class TrafficData {
    private FlowSegmentData flowSegmentData; // Reflect the nested JSON structure
    private String location; // Field to store location coordinates (latitude, longitude)

    // Default no-arg constructor
    public TrafficData() {}

    // Getter and Setter for flowSegmentData
    public FlowSegmentData getFlowSegmentData() {
        return flowSegmentData;
    }

    public void setFlowSegmentData(FlowSegmentData flowSegmentData) {
        this.flowSegmentData = flowSegmentData;
    }

    // Convenience method to directly get the currentSpeed
    public double getCurrentSpeed() {
        if (flowSegmentData != null) {
            return flowSegmentData.getCurrentSpeed();
        }
        return 0.0; // Default to 0 if flowSegmentData is null
    }

    // Convenience method to directly get the roadClosure status
    public boolean isRoadClosure() {
        if (flowSegmentData != null) {
            return flowSegmentData.isRoadClosure();
        }
        return false; // Default to false if flowSegmentData is null
    }

    // Getter and Setter for location
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    // Inner class to represent the nested flowSegmentData
    public static class FlowSegmentData {
        private double currentSpeed; // Matches the API's field name
        private boolean roadClosure; // Matches the API's field name
        private double freeFlowSpeed; // Field for free flow speed from API

        // Getter and Setter for currentSpeed
        public double getCurrentSpeed() {
            return currentSpeed;
        }

        public void setCurrentSpeed(double currentSpeed) {
            this.currentSpeed = currentSpeed;
        }

        // Getter and Setter for roadClosure
        public boolean isRoadClosure() {
            return roadClosure;
        }

        public void setRoadClosure(boolean roadClosure) {
            this.roadClosure = roadClosure;
        }

        // Getter and Setter for freeFlowSpeed
        public double getFreeFlowSpeed() {
            return freeFlowSpeed;
        }

        public void setFreeFlowSpeed(double freeFlowSpeed) {
            this.freeFlowSpeed = freeFlowSpeed;
        }
    }
}
