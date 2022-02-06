package com.backend.backend.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.backend.backend.exception.ResponseException;
import com.backend.backend.http.LoginRequest;
import com.backend.backend.http.RegisterRequest;
import com.backend.backend.service.AuthService;
import com.backend.backend.util.ResponseHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    private final static Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping(value = "/login")
    @CrossOrigin(origins = "http://localhost:3007", allowCredentials = "true")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (Exception e) {
            logger.error("Error while logging in: {}", e.getMessage());
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }

        var loginResponse = authService.handleLogin(loginRequest);
        Cookie tokenCookie = new Cookie("token", loginResponse.getToken());
        tokenCookie.setMaxAge(60 * 60 * 24 * 30);
        tokenCookie.setPath("/");
        tokenCookie.setHttpOnly(true);
        tokenCookie.setSecure(false);

        response.addCookie(tokenCookie);
        return ResponseHandler.generateResponse("success", HttpStatus.OK,
                loginResponse);
    }

    @PostMapping(value = "/register")
    @CrossOrigin(origins = "http://localhost:3007", allowCredentials = "true")
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
            logger.error("Error while registering: {}", e.getMessage());
            return ResponseHandler.generateResponse(e.getMessage(), e.getStatus(), null);
        }
    }

    @CrossOrigin(origins = "http://localhost:3007", allowCredentials = "true")
    @GetMapping(value = "/verify")
    public ResponseEntity<?> verify(HttpServletRequest request) {
        try {
            var token = request.getHeader("token");
            if (token == null) {
                throw new ResponseException("Invalid token", HttpStatus.UNAUTHORIZED);
            }
            var user = authService.verifyUser(token);
            return ResponseHandler.generateResponse("success", HttpStatus.OK, user);
        } catch (ResponseException e) {
            logger.error("Error while verifying user: {}", e.getMessage());
            return ResponseHandler.generateResponse(e.getMessage(), e.getStatus(), null);
        }
    }

}
