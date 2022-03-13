package com.backend.backend.repository;

import java.util.List;

import com.backend.backend.model.NoteEntity;
import com.backend.backend.util.WithPagination;

public interface CustomNoteRepository {
    public WithPagination<NoteEntity> getAllByUserId(String userId, Boolean completed, Boolean isDescending,
            String sortBy, int page,
            int size);

    public List<NoteEntity> searchNote(String search, String userId);
}
