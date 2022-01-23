package com.backend.backend.repository;

import com.backend.backend.entity.UserEntity;

public interface CustomUserRepository {

    public UserEntity findByUsername(String username);

    public UserEntity findByEmail(String email);

}
