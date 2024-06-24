package com.taskify;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TaskifyBackendApplication {

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	public static void main(String[] args) {
		String activeProfile = System.getProperty("spring.profiles.active", "development");
		Dotenv dotenv = Dotenv.configure()
                              .directory(".")
                              .filename(".env." + activeProfile)
                              .load();

        dotenv.entries().forEach(
			entry -> System.setProperty(entry.getKey(), entry.getValue())
		);

		SpringApplication.run(TaskifyBackendApplication.class, args);
	}

}
