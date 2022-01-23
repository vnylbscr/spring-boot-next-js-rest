package com.backend.backend.entity;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "notes")
@Data
public class NoteEntity {

    @Id
    private String id;
    private String text;

    private Boolean completed = false;

    @DBRef
    private UserEntity user;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    @Override
    public String toString() {
        return "Note" + "id " + this.getId() + "text" + this.getText() + "owner user" + this.getUser();
    }
}
