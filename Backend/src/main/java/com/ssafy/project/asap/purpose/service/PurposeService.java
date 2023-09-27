package com.ssafy.project.asap.purpose.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.repository.MemberRepository;
import com.ssafy.project.asap.purpose.entity.domain.Purpose;
import com.ssafy.project.asap.purpose.entity.dto.request.RegisterPurposeRequest;
import com.ssafy.project.asap.purpose.entity.dto.request.TotalRequest;
import com.ssafy.project.asap.purpose.entity.dto.response.FindPurposesResponse;
import com.ssafy.project.asap.purpose.repository.PurposeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class PurposeService {

    private final PurposeRepository purposeRepository;
    private final MemberRepository memberRepository;
    private final ApiRepository apiRepository;

    @Value("${server.test-header}")
    private String allowHeader;

    public void checkApply(Long apiId, String id) {

        purposeRepository.findByApiIdAndMemberId(apiId, memberRepository.findById(id).get().getMemberId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_REGISTERED_API));

    }

    @Transactional
    public void register(RegisterPurposeRequest request, String id){

        purposeRepository.findByApiAndMember(request.getApiId(), id)
                .ifPresent((e) -> {
                    throw new CustomException(ErrorCode.PURPOSE_DUPLICATED);
                });

        Purpose purpose = Purpose.builder()
                .api(apiRepository.findByApiId(request.getApiId()))
                .industry(request.getIndustry())
                .member(memberRepository.findById(id).get())
                .purpose(request.getPurpose())
                .build();

        purposeRepository.save(purpose);

    }

    public void createTotal(Long apiId, String id) {
        Api api = apiRepository.findByApiId(apiId);
        Member member = memberRepository.findById(id).orElseThrow();


        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
                .path("/api/v1/total")
                .encode()
                .build()
                .toUri();

        TotalRequest totalRequest = new TotalRequest(member.getWalletId(), api.getApiId());

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, allowHeader);
        headers.setContentType(MediaType.APPLICATION_JSON); // Content-Type을 application/json으로 설정

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody;

        try {
            requestBody = objectMapper.writeValueAsString(totalRequest);
        } catch (JsonProcessingException e) {
            log.error("JSON ERROR = " + e.getMessage());
            throw new RuntimeException(e);
        }

        HttpEntity<?> httpEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        log.info(responseEntity.toString());
    }

    public List<FindPurposesResponse> findAllByMember(String id){

        List<FindPurposesResponse> list = new ArrayList<>();

        for(Purpose purpose : purposeRepository.findAllByMember(memberRepository.findById(id).get())){

            list.add(FindPurposesResponse.builder()
                            .title(purpose.getApi().getTitle())
                    .build());

        }

        return list;

    }
}
