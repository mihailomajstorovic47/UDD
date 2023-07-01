package com.udd.udd.service;

import com.udd.udd.model.Location;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Service
public class LocationService {
    private static final String API_URL = "https://us1.locationiq.com/v1/";
    private static final String SEARCH_URL = "search.php";

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    Environment environment;

    public Location getLocationFromAddress(String address) throws Exception {
        String encodedAddress = URLEncoder.encode(address, StandardCharsets.UTF_8);
        try {
            ResponseEntity<Location[]> locationResponse = restTemplate.getForEntity(
                    API_URL + SEARCH_URL + "?key=" + environment.getProperty("API_KEY") + "&q=" + encodedAddress + "&format=json", Location[].class);
            return Objects.requireNonNull(locationResponse.getBody())[0];
        } catch (HttpClientErrorException e) {
            throw new Exception("Unable to find lgn and lat from city name");
        }
    }
}
