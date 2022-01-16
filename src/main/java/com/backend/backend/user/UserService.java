package com.backend.backend.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Data;

@Data
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<UserEntity> getUser(String id) {
        return this.userRepository.findById(id);
    }

    public List<UserEntity> getAll() {
        return this.userRepository.findAll();
    }

    public UserEntity createUser(UserEntity user) {
        return this.userRepository.save(user);
    }

    public UserEntity updateUser(UserEntity user) {
        var foundUser = this.userRepository.findById(user.getId());
        if (foundUser.isPresent()) {
            return this.createUser(user);
        }
        return null;
    }

}
