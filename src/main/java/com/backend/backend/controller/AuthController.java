package com.backend.backend.controller;

import com.backend.backend.exception.ResponseException;
import com.backend.backend.http.LoginRequest;
import com.backend.backend.http.RegisterRequest;
import com.backend.backend.service.AuthService;
import com.backend.backend.util.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            var response = authService.handleLogin(loginRequest);
            return ResponseHandler.generateResponse("success", HttpStatus.OK,
                    response);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            if (registerRequest.getPassword() == null
                    || registerRequest.getEmail() == null
                    || registerRequest.getUsername() == null) {
                throw new ResponseException("Bad credentials", HttpStatus.FORBIDDEN);
            }

            // handle register request.
            authService.handleRegister(registerRequest);

            return ResponseHandler.generateResponse("success", HttpStatus.OK, "ok");
        } catch (ResponseException e) {
            return ResponseHandler.generateResponse(e.getMessage(), e.getStatus(), null);
        }
    }

}
