package com.backend.backend.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHandler {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object resObject,
            Object... errors) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", message);
        map.put("status", status.value());
        map.put("data", resObject);
        map.put("errors", errors);

        return new ResponseEntity<Object>(map, status);
    }

    private ResponseHandler() {
        throw new IllegalStateException("Utility class");
    }

}
