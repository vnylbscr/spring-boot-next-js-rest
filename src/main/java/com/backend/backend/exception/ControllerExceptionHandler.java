package com.backend.backend.exception;

import java.util.List;

import com.backend.backend.util.ResponseHandler;

import org.springframework.context.support.DefaultMessageSourceResolvable;
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
        return ResponseHandler.generateResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public final ResponseEntity<?> validationError(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
        log.error("MethodArgumentNotValidException:{}", ex);
        return ResponseHandler.generateResponse("Validation Failed", HttpStatus.BAD_REQUEST, null, errors);
    }

    @ExceptionHandler(ResponseException.class)
    public ResponseEntity<?> handleResponseException(ResponseException ex) {
        log.error("ResponseException", ex);
        return ResponseHandler.generateResponse(ex.getMessage(), ex.getStatus(), null);
    }

}
