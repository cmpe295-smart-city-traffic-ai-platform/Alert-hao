package com.cmpe295B.alert_service;

import com.cmpe295B.model.Alert;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class AlertController {

    @Autowired
    private RestTemplate restTemplate;

    //private List<Alert> alerts = new ArrayList<>();

    @GetMapping("/generateAlerts")
    public ResponseEntity<List> generateAlerts() {
        try {
            List<Alert> alerts = new ArrayList<>();
            // Step 1: Call /getdronesformap API
            String dronesUrl = "http://localhost:5001/api/v1/droneScheduler/getdronesformap";

            // Construct request body with "role"
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("role", "client"); // Replace "client" with the appropriate role if needed

            // Log the request body for debugging
            System.out.println("Request URL: " + dronesUrl);
            System.out.println("Request Body: " + requestBody);

            // Make the API call
            ResponseEntity<List> response = restTemplate.postForEntity(dronesUrl, requestBody, List.class);

            // Log the response for debugging
            System.out.println("Response: " + response.getBody());

            // Step 2: Process the drone data and generate alerts
            List<Map<String, Object>> drones = response.getBody();

            if (drones != null) {
                for (Map<String, Object> drone : drones) {
                    String droneId = (String) drone.get("drone_id");
                    String location = (String) drone.get("location");
                    String droneName = (String) drone.get("drone_name");

                    // Create an alert for each drone
                    Alert alert = new Alert(
                            "Drone Alert",
                            "Drone ID: " + droneId + " (" + droneName + ") detected at location: " + location,
                            LocalDateTime.now(),
                            "Info",
                            droneId,
                            location
                    );
                    alerts.add(alert);
                }
            }

            // Step 3: Add previous traffic alerts (dummy example)
            Alert trafficAlert = new Alert(
                    "Traffic Jam",
                    "Low speed detected on highway",
                    LocalDateTime.now(),
                    "High",
                    "fc1bde95-ca92-47ab-9358-d98abc004394",
                    "37.333614,-122.049627"
            );
            alerts.add(trafficAlert);

            //return ResponseEntity.ok("Alerts generated successfully");
            return new ResponseEntity<>(alerts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            //return ResponseEntity.status(500).body("Error generating alerts: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /*
    @GetMapping("/alerts")
    public List<Alert> getAlerts() {
        return alerts;
    }*/
}