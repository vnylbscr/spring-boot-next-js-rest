package com.backend.backend.entity;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "users")
@Getter
@Setter
public class UserEntity {

    @Id
    private String id;

    @Indexed(unique = true)
    private String username;

    @Indexed(unique = true)
    private String email;

    private String password;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    public UserEntity(String username, String email, String password) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", email=" + email + "]" + ", password=" + password
                + "]";
    }
}
