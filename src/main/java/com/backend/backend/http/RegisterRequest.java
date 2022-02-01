package com.backend.backend.http;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {
    @NotNull
    @NotBlank(message = "This field cannot be dismissed")
    private String username;

    @NotNull
    @NotBlank(message = "This field cannot be dismissed")
    private String email;

    @NotNull
    @NotBlank(message = "This field cannot be dismissed")
    private String password;

}
