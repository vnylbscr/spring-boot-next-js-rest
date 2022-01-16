package com.backend.backend.note;

import java.util.Date;

import com.backend.backend.user.UserEntity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "notes")
public class NoteEntity {

    @Id
    private String id;
    private String text;

    private Boolean completed = false;

    @Field(name = "user")
    @DBRef(db = "users")
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
