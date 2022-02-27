package com.backend.backend.dto;

import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreateNoteDto {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Note content cannot be blank")
    private String text;

    @NotBlank(message = "userId is required")
    private String userId;
}
