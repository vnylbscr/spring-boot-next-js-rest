package com.backend.backend.controller;

import com.backend.backend.dto.CreateNoteDto;
import com.backend.backend.exception.ResponseException;
import com.backend.backend.model.NoteEntity;
import com.backend.backend.service.NoteService;
import com.backend.backend.util.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @CrossOrigin(origins = { "http://localhost:3007" })
    @GetMapping(value = "/getAll")
    public ResponseEntity<?> getAllNotes() {
        try {
            log.info("getAllNotes");
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.getAll());
        } catch (Exception e) {
            log.error("getAllNotes", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @CrossOrigin(origins = { "http://localhost:3007" })
    @GetMapping()
    public ResponseEntity<?> getSingleNote(@RequestParam String id) {
        try {
            log.info("getAllNotes");
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.getSingleNote(id));
        } catch (Exception e) {
            log.error("getAllNotes", e);
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @CrossOrigin(origins = { "http://localhost:3007" })
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserNotes(@PathVariable String userId) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.getAllByUserId(userId));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @CrossOrigin(origins = { "http://localhost:3007" })
    @PostMapping()
    public ResponseEntity<?> createNote(@RequestBody CreateNoteDto noteDto) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.ACCEPTED,
                    this.noteService.createNote(noteDto));
        } catch (ResponseException e) {
            return ResponseHandler.generateResponse(e.getMessage(), e.getStatus(), null);
        }
    }

    @CrossOrigin(origins = { "http://localhost:3007" })
    @DeleteMapping()
    public ResponseEntity<?> deleteNote(@RequestParam String id) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.ACCEPTED,
                    this.noteService.deleteNote(id));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @CrossOrigin(origins = { "http://localhost:3007" })
    @PostMapping("/complete")
    public ResponseEntity<?> completeNote(@RequestParam String id) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.ACCEPTED,
                    this.noteService.completeNote(id));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @CrossOrigin(origins = { "http://localhost:3007" })
    @PostMapping("/updateNote")
    public ResponseEntity<?> updateNote(@RequestParam NoteEntity note) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.updateNote(note));
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }
}
