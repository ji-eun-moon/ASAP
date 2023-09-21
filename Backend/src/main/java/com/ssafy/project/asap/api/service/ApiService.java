package com.ssafy.project.asap.api.service;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.api.repository.ApiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApiService {

    private final ApiRepository apiRepository;

    public List<FindApisResponse> findAll(){

        List<FindApisResponse> list = new ArrayList<>();

        for(Api api : apiRepository.findAll()){
            list.add(FindApisResponse.builder()
                    .apiId(api.getApiId())
                    .title(api.getTitle())
                    .content(api.getContent())
                    .tags(api.getTags())
                    .build());
        }

        return list;

    }

}
