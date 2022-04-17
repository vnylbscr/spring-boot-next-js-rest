package com.backend.backend.dto;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateNoteDto {
    @NotBlank(message = "Note id is required")
    private String id;

    private String title;
    @NotBlank(message = "Note content is required")
    private String text;
    private String color;
}
