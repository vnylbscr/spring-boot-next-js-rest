package com.backend.backend.dto;

import lombok.Data;

@Data
public class CreateNoteDto {
    private String text;
    private String userId;
}
