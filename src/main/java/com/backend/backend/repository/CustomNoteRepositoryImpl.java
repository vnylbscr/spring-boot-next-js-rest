package com.backend.backend.repository;

import java.util.List;

import com.backend.backend.model.NoteEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class CustomNoteRepositoryImpl implements CustomNoteRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<NoteEntity> getAllByUserId(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user").is(userId));
        return mongoTemplate.find(query, NoteEntity.class);
    }

}