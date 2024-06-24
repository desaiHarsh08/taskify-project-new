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
		String activeProfile = System.getProperty("spring.profiles.active", "production");
		Dotenv dotenv = Dotenv.configure()
							  .directory(".")
							  .filename(".env")
							  .load();
	
		// Print out all entries from dotenv to verify
		System.out.println("Loaded environment variables:");
		dotenv.entries().forEach(entry -> {
			String key = entry.getKey();
			String value = entry.getValue();
			System.out.println(key + "=" + value);
	
			// Set system property if needed
			System.setProperty(key, value);
		});
	
		SpringApplication.run(TaskifyBackendApplication.class, args);
	}
	
	
}
