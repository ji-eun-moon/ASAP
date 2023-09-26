package com.ssafy.project.asap.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.entity.dto.request.GetCategoryRequest;
import com.ssafy.project.asap.api.entity.dto.request.RegisterBlockApiRequest;
import com.ssafy.project.asap.api.entity.dto.response.FindApiResponse;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.api.entity.dto.response.GuideApiResponse;
import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiService {

    private final ApiRepository apiRepository;
    private final MemberRepository memberRepository;

    @Value("${server.test-header}")
    private String allowHeader;

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
                .price(api.getPrice())
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

        log.info("request = " + request.toString());

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io")
                .path("/block/api/v1/asap/register")
                .encode()
                .build()
                .toUri();

        log.info(uri.toString());

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, allowHeader);
        headers.setContentType(MediaType.APPLICATION_JSON); // Content-Type을 application/json으로 설정

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody;

        try {
            requestBody = objectMapper.writeValueAsString(request);
        } catch (JsonProcessingException e) {
            log.error("JSON ERROR = " + e.getMessage());
            throw new RuntimeException(e);
        }

        HttpEntity<?> httpEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);

//        log.info((String) responseEntity.getBody());

    }

    public Api findByApiId(Long apiId){

        return apiRepository.findByApiId(apiId);

    }

    public Object findCategoryIdsById(GetCategoryRequest getCategoryRequest) throws JsonProcessingException {
        Api api = findByApiId(getCategoryRequest.getApiId());

        String ids = "";
        List<Api> apis = apiRepository.findAllByCategory(api.getCategory());
        for (Api api1 : apis) {
            ids += api1.getApiId().toString() + ",";
        }
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("ids", Collections.singletonList(ids));
        params.put("year", Collections.singletonList(String.valueOf(getCategoryRequest.getYear())));
        params.put("month", Collections.singletonList(String.valueOf(getCategoryRequest.getMonth())));


        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:9001")
                .path("/api/v1/usage/category/average")
                .encode()
                .queryParams(params)
                .build()
                .toUri();

        log.info(uri.toString());

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, allowHeader);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> httpEntity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);
        log.info(String.valueOf(responseEntity));
        return responseEntity.getBody();
    }

}
