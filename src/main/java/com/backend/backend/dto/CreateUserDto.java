package com.backend.backend.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserDto {

    @Max(value = 24, message = "Merto lala hata kodu")
    private Integer id;

    @NotBlank(message = "This field cannot be dismissed")
    private String name;

    @Email
    private String email;
}
