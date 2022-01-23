package com.backend.backend.controller;

import com.backend.backend.model.UserEntity;
import com.backend.backend.service.UserService;
import com.backend.backend.util.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Object> getAll() {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.userService.getAll());
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserWithId(@PathVariable String id) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.userService.getUserWithDto(id));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserEntity paramUser) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.userService.createUser(paramUser));
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, "Not found");
        }
    }

}
