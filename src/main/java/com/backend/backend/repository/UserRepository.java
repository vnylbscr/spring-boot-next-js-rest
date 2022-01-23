package com.backend.backend.repository;

import com.backend.backend.entity.UserEntity;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, String>, CustomUserRepository {
}
