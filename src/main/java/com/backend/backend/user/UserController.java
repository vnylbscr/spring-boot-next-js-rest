package com.backend.backend.user;

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
            return ResponseHandler.generateResponse("error", HttpStatus.NOT_FOUND, "Not found");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserWithId(@PathVariable String id) {
        try {
            var foundUser = this.userService.getUser(id);
            if (foundUser.isPresent()) {
                return ResponseHandler.generateResponse("success", HttpStatus.OK, this.userService.getUser(id));
            } else {
                return ResponseHandler.generateResponse("User not found", HttpStatus.BAD_REQUEST, null);
            }
        } catch (Exception e) {
            return ResponseHandler.generateResponse("error", HttpStatus.BAD_REQUEST, "Invalid credentials");
        }
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserEntity paramUser) {
        try {
            return ResponseHandler.generateResponse("success", HttpStatus.OK, this.userService.createUser(paramUser));
        } catch (Exception e) {
            return ResponseHandler.generateResponse("error", HttpStatus.NOT_FOUND, "Not found");
        }
    }
}
