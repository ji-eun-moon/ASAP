package com.ssafy.project.asap.api.service;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.entity.dto.response.FindApiResponse;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.api.entity.dto.response.GuideApiResponse;
import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApiService {

    private final ApiRepository apiRepository;
    private final MemberRepository memberRepository;

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

    public FindApiResponse findApiResponse(Long apiId){

        Api api = apiRepository.findByApiId(apiId);

        return FindApiResponse.builder()
                .apiId(api.getApiId())
                .title(api.getTitle())
                .content(api.getContent())
                .output(api.getOutput())
                .tags(api.getTags())
                .memberName(memberRepository.findById(api.getMember().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.USER_ID_NOT_FOUND)).getName())
                .build();

    }

    public GuideApiResponse findGuideApiResponse(Long apiId){

        Api api = apiRepository.findByApiId(apiId);

        return GuideApiResponse.builder()
                .title(api.getTitle())
                .api(api.getApi())
                .input(api.getInput())
                .output(api.getOutput())
                .build();

    }

}
