package com.backend.backend.repository;

import com.backend.backend.model.UserEntity;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, String>, CustomUserRepository {
}
