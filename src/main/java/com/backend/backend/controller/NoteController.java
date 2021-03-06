package com.backend.backend.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import com.backend.backend.dto.CreateNoteDto;
import com.backend.backend.dto.UpdateNoteDto;
import com.backend.backend.exception.ResponseException;
import com.backend.backend.service.NoteService;
import com.backend.backend.util.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/note")
@Slf4j
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping(value = "/getAll")
    public ResponseEntity<?> getAllNotes() {
        log.info("getAllNotes");
        return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.getAll());

    }

    @GetMapping("/search")
    public ResponseEntity<?> searchNote(@RequestParam(value = "query", required = false) String search,
            @RequestParam(value = "user", required = false) String userId) {
        log.info("searchNote");
        return ResponseHandler.generateResponse("success", HttpStatus.OK,
                this.noteService.searchNote(search, userId));
    }

    @GetMapping()
    public ResponseEntity<?> getSingleNote(@RequestParam String id) {
        log.info("getAllNotes");
        return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.getSingleNote(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserNotes(@PathVariable String userId,
            @RequestParam(required = false) Boolean isDescending,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        return ResponseHandler.generateResponse("success", HttpStatus.OK,
                this.noteService.getAllByUserId(userId, completed, isDescending, sortBy, page, size));

    }

    @PostMapping("/create")
    public ResponseEntity<?> createNote(@Valid @RequestBody CreateNoteDto noteDto) throws ResponseException {
        log.info("createNote color", noteDto.getColor());
        return ResponseHandler.generateResponse("success", HttpStatus.CREATED,
                this.noteService.createNote(noteDto));
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteNote(@Valid @RequestParam @NotBlank(message = "id can't be blank") String id) {
        return ResponseHandler.generateResponse("success", HttpStatus.ACCEPTED,
                this.noteService.deleteNote(id));

    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeNote(@Valid @RequestParam String id) throws ResponseException {
        return ResponseHandler.generateResponse("success", HttpStatus.ACCEPTED,
                this.noteService.completeNote(id));

    }

    @PostMapping("/updateNote")
    public ResponseEntity<?> updateNote(@Valid @RequestBody UpdateNoteDto updateNoteDto) throws ResponseException {
        return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.updateNote(updateNoteDto));
    }
}
