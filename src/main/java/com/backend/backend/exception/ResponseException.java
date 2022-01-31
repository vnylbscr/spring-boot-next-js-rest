package com.backend.backend.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class ResponseException extends Exception {

    private HttpStatus status;

    public ResponseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
