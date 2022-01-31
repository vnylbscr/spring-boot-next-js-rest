package com.backend.backend.http;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginRequest {
    @NotNull(message = "Cannot be emptyyy")
    @NotEmpty(message = "This field cannot be empty")
    private String email;
    @NotEmpty(message = "This field cannot be empty")
    private String password;
}
