package com.ssafy.project.asap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.nio.charset.StandardCharsets;

@SpringBootApplication
@EnableJpaAuditing
public class asapApplication {

	public static void main(String[] args) {
		SpringApplication.run(asapApplication.class, args);
	}


}
