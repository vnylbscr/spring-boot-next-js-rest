package com.backend.backend.dto;

import java.util.Date;

import lombok.Data;

@Data
public class GetUserDto {
    private String id;
    private String email;
    private String username;
    private Date createdAt;
    private Date updatedAt;
}
