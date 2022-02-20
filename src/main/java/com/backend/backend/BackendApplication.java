package com.backend.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@SpringBootApplication
@EnableMongoAuditing
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public OpenAPI customOpenAPI(@Value("${springdoc.api.title}") String title,
			@Value("${springdoc.api.description}") String description) {
		return new OpenAPI().info(new Info().title(title).description(description))
				.components(new Components().addSecuritySchemes("Authorization", new SecurityScheme()
						.type(SecurityScheme.Type.APIKEY).in(SecurityScheme.In.HEADER).name("Authorization")))
				.addSecurityItem(new SecurityRequirement().addList("mySecretHeader"));
	}

}
