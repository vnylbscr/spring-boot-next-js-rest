package com.backend.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.backend.backend.dto.CreateNoteDto;
import com.backend.backend.dto.GetNoteDto;
import com.backend.backend.entity.NoteEntity;
import com.backend.backend.entity.UserEntity;
import com.backend.backend.repository.NoteRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

    private UserService userService;
    @Autowired
    private NoteRepository noteReposity;

    private ModelMapper modelMapper;

    public NoteService(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    public List<GetNoteDto> getAll() {
        var notes = noteReposity.findAll();
        List<GetNoteDto> noteDtos = new ArrayList<>();
        for (NoteEntity noteEntity : notes) {
            GetNoteDto nto = modelMapper.map(noteEntity, GetNoteDto.class);
            noteDtos.add(nto);
        }
        return noteDtos;
    }

    public GetNoteDto getSingleNote(String id) {
        NoteEntity note = noteReposity.findById(id).get();
        return modelMapper.map(note, GetNoteDto.class);
    }

    public List<NoteEntity> getAllByUserId(String userId) {
        return noteReposity.getAllByUserId(userId);
    }

    public NoteEntity createNote(CreateNoteDto noteDto) {
        UserEntity user = userService.getUser(noteDto.getUserId()).get();
        if (user.getId() == null) {
            throw new Error("User not exist.");
        }
        NoteEntity note = new NoteEntity();
        note.setCreatedAt(new Date());
        note.setText(noteDto.getText());
        note.setUser(user);
        return noteReposity.insert(note);
    }

    public Optional<Boolean> deleteNote(String noteId) {
        noteReposity.deleteById(noteId);
        return null;
    }

    public NoteEntity updateNote(NoteEntity note) {
        var existNote = noteReposity.findById(note.getId());
        if (existNote.isPresent()) {
            return noteReposity.save(note);
        }
        return null;
    }

}
