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
import com.ssafy.project.asap.purpose.entity.dto.response.FindPurposesDateResponse;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
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

    public void checkApplyByApiIdAndMemberId(Long apiId, Long memberId) {
        purposeRepository.findByApiAndMember(apiId, memberId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_REGISTERED_API)
        );
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

            Api api = purpose.getApi();

            list.add(FindPurposesResponse.builder()
                    .title(api.getTitle())
                    .apiId(api.getApiId())
                    .build());

        }

        return list;

    }

    public List<FindPurposesDateResponse> findAllByApiAndCreateDate(Long apiId) throws JsonProcessingException {
        LocalDateTime sevenDaysAgo = LocalDate.now().minusDays(7).atStartOfDay();

        // purposeRepository를 통해 Object[] 형태의 데이터를 가져옵니다.
        List<Object[]> resultList = purposeRepository.findAllByApiAndCreateDate(apiId, sevenDaysAgo);

        List<FindPurposesDateResponse> responseList = new ArrayList<>();

        for (Object[] result : resultList) {
            if (result.length >= 2) {
                String dateStr = result[0].toString();
                int count = Integer.parseInt(result[1].toString());

                // FindPurposesDateResponse 객체를 생성하고 데이터를 매핑합니다.
                LocalDate date = LocalDate.parse(dateStr);
                FindPurposesDateResponse response = new FindPurposesDateResponse(date, (long) count);

                // 리스트에 추가합니다.
                responseList.add(response);
            }
        }

        return responseList;
    }


}
