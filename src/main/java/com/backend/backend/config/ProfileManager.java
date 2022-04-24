package com.backend.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class ProfileManager {

    @Autowired
    private Environment environment;

    @Bean
    CommandLineRunner runner() {
        return args -> {
            for (final String profileName : environment.getActiveProfiles()) {
                System.out.println("Currently active profile - " + profileName);
            }
        };
    }
}