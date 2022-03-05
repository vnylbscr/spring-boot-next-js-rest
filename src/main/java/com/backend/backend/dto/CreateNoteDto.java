package com.backend.backend.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreateNoteDto {
    private String title;

    @NotBlank(message = "Note content cannot be blank")
    private String text;

    private String color;

    @NotBlank(message = "userId is required")
    private String userId;
}
