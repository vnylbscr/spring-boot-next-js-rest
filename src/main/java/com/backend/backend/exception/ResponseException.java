package com.backend.backend.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ResponseException extends Exception {

    private String message = "An error occured.";
    private HttpStatus status;

    public ResponseException(String message, HttpStatus status) {
        super(message);
    }
}
