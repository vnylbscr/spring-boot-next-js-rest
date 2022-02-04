package com.backend.backend.service;

import com.backend.backend.dto.GetUserDto;
import com.backend.backend.exception.ResponseException;
import com.backend.backend.http.LoginRequest;
import com.backend.backend.http.LoginResponse;
import com.backend.backend.http.RegisterRequest;
import com.backend.backend.model.UserEntity;
import com.backend.backend.security.TokenManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import lombok.Data;

@Data
@Service
public class AuthService {

    private final UserService userService;
    private final TokenManager tokenManager;
    private final static Logger logger = LoggerFactory.getLogger(AuthService.class);

    public AuthService(UserService userService, TokenManager tokenManager) {
        this.userService = userService;
        this.tokenManager = tokenManager;
    }

    public LoginResponse handleLogin(LoginRequest req) {
        var user = userService.getByEmail(req.getEmail());
        var token = tokenManager.generateToken(req.getEmail());
        LoginResponse resp = new LoginResponse(token, user);
        return resp;
    }

    public boolean handleRegister(RegisterRequest req) throws ResponseException {
        var user = new UserEntity(req.getUsername(), req.getEmail(), req.getPassword());
        userService.createUser(user);
        return true;
    }

    public GetUserDto verifyUser(String token) throws ResponseException {
        try {
            var userEmail = tokenManager.getSubject(token);
            var user = userService.getByEmail(userEmail);
            return user;
        } catch (Exception e) {
            logger.error("Error verifying user: " + e.getMessage());
            throw new ResponseException("Invalid token", HttpStatus.UNAUTHORIZED);
        }
    }
}
