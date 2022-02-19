package com.backend.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import com.backend.backend.model.UserEntity;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
public class UserServiceTest {

    private UserService userService;
    private ModelMapper modelMapper;
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        modelMapper = Mockito.mock(ModelMapper.class);
        userRepository = Mockito.mock(UserRepository.class);
        passwordEncoder = Mockito.mock(BCryptPasswordEncoder.class);
        userService = new UserService(modelMapper, userRepository, passwordEncoder);
    }

    @Test
    public void when_call_getUserWithEntity() {
        // TODO
        UserEntity userEntity = new UserEntity("merto", "test@test.com", "123123");
        Mockito.when(userRepository.findById(userEntity.getId())).thenReturn(Optional.of(userEntity));
        UserEntity result = userService.getUserWithEntity(userEntity.getId()).get();
        assertEquals(userEntity.getId(), result.getId());
        assertEquals(userEntity.getPassword(), result.getPassword());
        assertEquals(userEntity.getUsername(), result.getUsername());
    }

}
