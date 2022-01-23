package com.backend.backend.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetNoteDto {
    private String id;
    private String text;
    private Boolean completed;
    private GetUserDto user;
    private Date createdAt;
}
