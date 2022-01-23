package com.backend.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.backend.backend.dto.GetUserDto;
import com.backend.backend.model.UserEntity;
import com.backend.backend.repository.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.Data;

@Data
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserService(ModelMapper modelMapper, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    public Optional<UserEntity> getUser(String id) {
        return this.userRepository.findById(id);
    }

    public GetUserDto getUserWithDto(String id) {
        var user = this.getUser(id).get();
        return modelMapper.map(user, GetUserDto.class);
    }

    public List<GetUserDto> getAll() {
        var users = this.userRepository.findAll();
        List<GetUserDto> usersResp = new ArrayList<>();
        users.forEach(user -> {
            GetUserDto gto = modelMapper.map(user, GetUserDto.class);
            usersResp.add(gto);
        });
        return usersResp;
    }

    public UserEntity createUser(UserEntity user) {
        var foundUser = this.userRepository.findByUsername(user.getUsername());
        if (foundUser != null)
            throw new Error("User already exist.");
        return this.userRepository.save(user);
    }

    public UserEntity updateUser(UserEntity user) {
        return this.createUser(user);
    }
}
