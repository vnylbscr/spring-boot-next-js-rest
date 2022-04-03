package com.backend.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.backend.backend.dto.GetUserDto;
import com.backend.backend.exception.ResponseException;
import com.backend.backend.model.UserEntity;
import com.backend.backend.repository.UserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.Data;

@Data
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(ModelMapper modelMapper, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<GetUserDto> getUser(String id) {
        return Optional.of(modelMapper.map(this.userRepository.findById(id), GetUserDto.class));
    }

    public Optional<UserEntity> getUserWithEntity(String id) {
        return this.userRepository.findById(id);
    }

    public GetUserDto getUserWithDto(String id) {
        var user = this.getUser(id).get();
        return modelMapper.map(user, GetUserDto.class);
    }

    public List<GetUserDto> getAll() {
        var users = this.userRepository.findAll();

        return convertUserDtos(users);
    }

    public List<UserEntity> getAllWithPassword() {
        return userRepository.findAll();
    }

    public GetUserDto createUser(UserEntity user) throws ResponseException {
        var foundUser = this.userRepository.findByEmail(user.getEmail());
        if (foundUser != null)
            throw new ResponseException("User already exist.", HttpStatus.BAD_REQUEST);
        // hashing password
        String password = user.getPassword();
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        UserEntity savedUser = this.userRepository.save(user);
        return modelMapper.map(savedUser, GetUserDto.class);
    }

    public GetUserDto updateUser(UserEntity user) throws ResponseException {
        return this.createUser(user);
    }

    public GetUserDto getByEmail(String email) {
        var foundUser = userRepository.findByEmail(email);
        GetUserDto response = modelMapper.map(foundUser, GetUserDto.class);
        return response;
    }

    public UserEntity getByEmailWithEntity(String email) {
        var foundUser = userRepository.findByEmail(email);
        return foundUser;
    }

    private List<GetUserDto> convertUserDtos(List<UserEntity> users) {
        List<GetUserDto> usersResp = new ArrayList<>();
        users.forEach(user -> {
            GetUserDto gto = modelMapper.map(user, GetUserDto.class);
            usersResp.add(gto);
        });
        return usersResp;
    }

}
