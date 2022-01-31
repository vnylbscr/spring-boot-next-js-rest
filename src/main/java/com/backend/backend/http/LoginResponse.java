package com.backend.backend.http;

import com.backend.backend.dto.GetUserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private GetUserDto user;
}
