package com.backend.backend.security;

import java.util.ArrayList;

import com.backend.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        var foundUser = userService.getByEmailWithEntity(email);

        if (foundUser == null) {
            throw new UsernameNotFoundException("User not found.");
        } else {
            UserDetails details = new User(foundUser.getEmail(), foundUser.getPassword(), new ArrayList<>());
            System.out.println("user details is " + details);
            return details;
        }
    }
}
