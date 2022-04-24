package com.backend.backend.controller;

import com.backend.backend.service.UserService;
import com.backend.backend.util.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseHandler.generateResponse("success", HttpStatus.OK, this.userService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserWithId(
            @PathVariable("id") String id) {
        var resp = this.userService.getUserWithDto(id);
        if (resp.getId() == null) {
            return ResponseHandler.generateResponse("User not found", HttpStatus.OK, null);
        }
        return ResponseHandler.generateResponse("success", HttpStatus.OK, resp);

    }

}
