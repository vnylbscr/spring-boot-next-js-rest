package com.backend.backend.note;

import java.util.List;
import java.util.Map;

import com.backend.backend.util.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/note")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping(value = "/getAll")
    public ResponseEntity<Object> getAllNotes() {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.getAll());
        } catch (Exception e) {
            return ResponseHandler.generateResponse("error", HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUserNotes(@PathVariable String userId) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.getAllByUserId(userId));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @PostMapping()
    public Object createNote(@RequestBody NoteDto noteDto) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.ACCEPTED, this.noteService.createNote(note));
            return null;
            // return ResponseHandler.generateResponse("success", HttpStatus.OK,
            // this.noteService.createNote(note));
        } catch (Exception e) {
            // TODO need more error handling details here.
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }

    }

    @PostMapping("/updateNote")
    public ResponseEntity<Object> updateNote(@RequestParam NoteEntity note) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.noteService.updateNote(note));
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }
}
