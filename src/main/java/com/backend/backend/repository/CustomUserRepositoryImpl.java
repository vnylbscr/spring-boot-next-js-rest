package com.backend.backend.repository;

import com.backend.backend.model.UserEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class CustomUserRepositoryImpl implements CustomUserRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public UserEntity findByUsername(String username) {
        final Query query = new Query();
        UserEntity foundUser = mongoTemplate.findOne(
                query.addCriteria(Criteria.where("username").is(username)),
                UserEntity.class);
        return foundUser;
    }

    @Override
    public UserEntity findByEmail(String email) {
        final Query query = new Query();
        UserEntity foundUser = mongoTemplate.findOne(
                query.addCriteria(Criteria.where("email").is(email)),
                UserEntity.class);
        return foundUser;
    }

}
