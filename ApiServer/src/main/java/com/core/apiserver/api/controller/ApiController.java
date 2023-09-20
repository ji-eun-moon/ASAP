package com.core.apiserver.api.controller;

import com.core.apiserver.api.service.ApiService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/api")
@Tag(name = "API", description = "API 관련 API")
public class ApiController {

    private final ApiService apiService;
}
