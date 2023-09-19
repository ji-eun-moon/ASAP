package com.ssafy.project.asap.api.service;

import com.ssafy.project.asap.api.repository.ApiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApiService {

    private final ApiRepository apiRepository;

}
