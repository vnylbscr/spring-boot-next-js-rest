package com.backend.backend.exception;

import com.backend.backend.util.ResponseHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class ControllerExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception ex) {
        log.error("Exception", ex);
        return ResponseHandler.generateResponse("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR, null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        log.error("MethodArgumentNotValidException", ex);
        return ResponseHandler.generateResponse("Bad request", HttpStatus.BAD_REQUEST, null);
    }

}
