package com.cmpe295B.alert_service;

import com.cmpe295B.model.Alert;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.*;
import java.security.cert.X509Certificate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/alert")
public class AlertController {

    private RestTemplate restTemplate;

    public AlertController() {
        this.restTemplate = createRestTemplate();
    }

    private RestTemplate createRestTemplate() {
        try {
            // Disable SSL verification
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[]{new X509TrustManager() {
                @Override
                public void checkClientTrusted(X509Certificate[] x509Certificates, String s) {}

                @Override
                public void checkServerTrusted(X509Certificate[] x509Certificates, String s) {}

                @Override
                public X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
            }}, new java.security.SecureRandom());

            HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
            HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);

            return new RestTemplate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create RestTemplate with disabled SSL validation", e);
        }
    }

    @GetMapping("/generateAlerts")
    public ResponseEntity<List<Alert>> generateAlerts() {
        try {
            List<Alert> alerts = new ArrayList<>();

            // Step 1: Call /getdronesformap API
            String dronesUrl = "https://100.26.248.255:5001/api/v1/droneScheduler/getdronesformap";

            // Construct request body with "role"
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("role", "client");

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

            return new ResponseEntity<>(alerts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}