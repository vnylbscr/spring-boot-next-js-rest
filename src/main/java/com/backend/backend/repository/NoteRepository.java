package com.backend.backend.repository;

import com.backend.backend.model.NoteEntity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends MongoRepository<NoteEntity, String>, CustomNoteRepository {
}
