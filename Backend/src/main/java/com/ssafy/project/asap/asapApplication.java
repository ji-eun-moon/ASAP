package com.ssafy.project.asap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class asapApplication {

	public static void main(String[] args) {
		SpringApplication.run(asapApplication.class, args);
	}

}
