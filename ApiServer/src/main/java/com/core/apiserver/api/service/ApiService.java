package com.core.apiserver.api.service;

import com.core.apiserver.api.repository.ApiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApiService {

    private final ApiRepository apiRepository;
}
