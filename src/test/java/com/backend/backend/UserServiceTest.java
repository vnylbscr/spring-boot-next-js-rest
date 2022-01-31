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
    public void shouldGetUserSuccessfully() {
        UserEntity user = new UserEntity("test", "test@test.com", "123123");
        user.setId("1");
        userService.getUser(user.getId());
        Mockito.when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        assertEquals(user.getId(), "1");
        assertEquals(user.getEmail(), "test@test.com");
        assertEquals(user.getPassword(), "123123");
    }

    public void shouldGetAllUserSuccessfully() {

    }

}
