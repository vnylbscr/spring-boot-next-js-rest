package com.backend.backend.repository;

import java.util.List;

import com.backend.backend.model.NoteEntity;

public interface CustomNoteRepository {
    public List<NoteEntity> getAllByUserId(String userId);
}