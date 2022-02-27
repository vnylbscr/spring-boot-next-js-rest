package com.backend.backend.controller;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

import com.backend.backend.dto.CreateUserDto;
import com.backend.backend.service.UserService;
import com.backend.backend.util.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController()
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3007", allowCredentials = "true")
@Slf4j
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.userService.getAll());
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, null);
        }
    }

    // Merto
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserWithId(
            @PathVariable("id") String id) {
        try {
            var resp = this.userService.getUserWithDto(id);
            if (resp.getId() == null) {
                return ResponseHandler.generateResponse("User not found", HttpStatus.NOT_FOUND, null);
            }
            return ResponseHandler.generateResponse("success", HttpStatus.OK, resp);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @PostMapping
    public ResponseEntity<?> createUser(
            @Valid @RequestBody CreateUserDto createUserDto) {
        log.error("createUser", createUserDto);
        return ResponseHandler.generateResponse("success", HttpStatus.OK, null);

    }

    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestBody String userId) {
        try {
            this.userService.deleteUser(userId);
            return ResponseHandler.generateResponse("success", HttpStatus.OK, "User deleted");
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.NOT_FOUND, "Not found");
        }
    }

}
