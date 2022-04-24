package com.backend.backend.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.CookieValue;
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
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
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
        tokenCookie.setSecure(true);

        Cookie loggedCookie = new Cookie("isLoggedIn", "true");
        loggedCookie.setMaxAge(60 * 60 * 24 * 30);
        loggedCookie.setPath("/");
        loggedCookie.setHttpOnly(true);
        loggedCookie.setSecure(true);

        response.addCookie(tokenCookie);
        response.addCookie(loggedCookie);
        return ResponseHandler.generateResponse("success", HttpStatus.OK,
                loginResponse);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) throws ResponseException {
        if (registerRequest.getPassword() == null
                || registerRequest.getEmail() == null
                || registerRequest.getUsername() == null) {
            throw new ResponseException("Bad credentials", HttpStatus.BAD_REQUEST);
        }

        // handle register request.
        authService.handleRegister(registerRequest);

        return ResponseHandler.generateResponse("success", HttpStatus.OK, "ok");
    }

    @GetMapping(value = "/verify")
    public ResponseEntity<?> verify(@CookieValue(name = "token", defaultValue = "") String cookieToken,
            HttpServletRequest request, HttpServletResponse response) throws ResponseException {
        Cookie cookieLoggedIn;
        logger.debug("Verifying token: {}", cookieToken);
        var token = request.getHeader("token");
        if (token == null) {
            ResponseHandler.generateResponse("Token not found", HttpStatus.UNAUTHORIZED, null);
        }
        var user = authService.verifyUser(token);
        cookieLoggedIn = new Cookie("isLoggedIn", "true");
        cookieLoggedIn.setMaxAge(60 * 60 * 24 * 30);
        cookieLoggedIn.setPath("/");
        cookieLoggedIn.setHttpOnly(true);
        cookieLoggedIn.setSecure(true);

        response.addCookie(cookieLoggedIn);
        return ResponseHandler.generateResponse("success", HttpStatus.OK, user);
    }

}
