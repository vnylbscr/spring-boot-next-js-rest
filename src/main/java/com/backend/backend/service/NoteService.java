package com.backend.backend.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.backend.backend.dto.CreateNoteDto;
import com.backend.backend.dto.GetNoteDto;
import com.backend.backend.exception.ResponseException;
import com.backend.backend.model.NoteEntity;
import com.backend.backend.model.UserEntity;
import com.backend.backend.repository.NoteRepository;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class NoteService {

    private final UserService userService;
    private final NoteRepository noteReposity;
    private final ModelMapper modelMapper;

    public NoteService(UserService userService, ModelMapper modelMapper, NoteRepository noteRepository) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.noteReposity = noteRepository;
    }

    public List<GetNoteDto> getAll() {
        var notes = noteReposity.findAll();
        return convertNoteDtos(notes);
    }

    public GetNoteDto getSingleNote(String id) {
        NoteEntity note = noteReposity.findById(id).get();
        return modelMapper.map(note, GetNoteDto.class);
    }

    public List<GetNoteDto> getAllByUserId(String userId) {
        var notes = noteReposity.getAllByUserId(userId);
        return convertNoteDtos(notes);
    }

    public GetNoteDto createNote(CreateNoteDto noteDto) throws ResponseException {
        UserEntity user = userService.getUserWithEntity(noteDto.getUserId()).get();
        if (user.getId() == null) {
            throw new ResponseException("User not exist.", HttpStatus.NOT_FOUND);
        }
        NoteEntity note = new NoteEntity();
        note.setCreatedAt(new Date());
        note.setText(noteDto.getText());
        note.setTitle(noteDto.getTitle());
        note.setUser(user);

        return convertNoteDto(
                noteReposity.insert(note));
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

    public GetNoteDto completeNote(String noteId) {
        var existNote = noteReposity.findById(noteId);
        if (existNote.isPresent()) {
            existNote.get().setCompleted(true);
            return convertNoteDto(noteReposity.save(existNote.get()));
        }
        return null;
    }

    private List<GetNoteDto> convertNoteDtos(List<NoteEntity> notes) {
        List<GetNoteDto> noteDtos = new ArrayList<>();
        notes.forEach(note -> {
            noteDtos.add(modelMapper.map(note, GetNoteDto.class));
        });
        return noteDtos;
    }

    private GetNoteDto convertNoteDto(NoteEntity note) {
        return modelMapper.map(note, GetNoteDto.class);
    }

}
