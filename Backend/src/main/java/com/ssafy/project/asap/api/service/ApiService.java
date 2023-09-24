package com.ssafy.project.asap.api.service;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.entity.dto.request.RegisterBlockApiRequest;
import com.ssafy.project.asap.api.entity.dto.response.FindApiResponse;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.api.entity.dto.response.GuideApiResponse;
import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
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
                    .category(api.getCategory().getCategory())
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
                .category(api.getCategory().getCategory())
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
                .inputExample(api.getInputExample())
                .output(api.getOutput())
                .outputExample(api.getOutputExample())
                .build();

    }

    public void registerApi(RegisterBlockApiRequest request){

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io")
                .path("/block/api/v1/asap/register")
                .encode()
                .build()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForEntity(uri, request, Object.class);

    }

    public Api findByApiId(Long apiId){

        return apiRepository.findByApiId(apiId);

    }

}
