package com.backend.backend.note;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteReposity;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<NoteEntity> getAll() {
        return this.noteReposity.findAll();
    }

    public List<NoteEntity> getAllByUserId(String userId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user").is(userId));
        var notes = this.mongoTemplate.find(query, NoteEntity.class);
        return notes;
    }

    public NoteEntity createNote(NoteDto note) {
        return this.noteReposity.insert(note);
    }

    public Optional<Boolean> deleteNote(String noteId) {
        this.noteReposity.deleteById(noteId);
        return null;
    }

    public NoteEntity updateNote(NoteEntity note) {
        var existNote = this.noteReposity.findById(note.getId());
        if (existNote.isPresent()) {
            return this.noteReposity.save(note);
        }
        return null;
    }
}
