package com.ssafy.project.asap.asap.controller;

import com.ssafy.project.asap.asap.domain.request.LocalSearch;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.service.MemberService;
import com.ssafy.project.asap.purpose.service.PurposeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/asap")
@RequiredArgsConstructor
@Slf4j
public class AsapController {

    private final MemberService memberService;
    private final PurposeService purposeService;
    @Value("${server.allow-header}")
    private String allowHeader;
    @Value("${server.test-header}")
    private String testHeader;


    // https://j9c202.p.ssafy.io/block/api/v1/asap/local/search.address.json
    @GetMapping("/local/search/address.json")
    public ResponseEntity<?> LocalSearch(@RequestBody LocalSearch request, HttpServletRequest httpServletRequest){

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Long id = memberService.checkWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.put("query", Collections.singletonList(request.getQuery()));
        map.put("analyze_type", Collections.singletonList(request.getAnalyze_type()));

        if(request.getPage() != 0){
            map.put("page", Collections.singletonList(String.valueOf(request.getPage())));
        }

        if(request.getSize() != 0){
            map.put("size", Collections.singletonList(String.valueOf(request.getSize())));
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io")
                .path("/block/api/v1/asap/local/search/keyword/" + id + "/23")
                .queryParams(map)
                .encode()
                .build()
                .toUri();

        log.info(uri.toString());

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, allowHeader); // 이 부분에서 헤더를 설정합니다.

            HttpEntity<?> httpEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, JSONObject.class);

            return ResponseEntity.ok(responseEntity.getBody());

        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.ok(e.getMessage());
        }

    }

    @GetMapping("/local/search/keyword")
    public ResponseEntity<?> KeywordSearch(@RequestParam MultiValueMap<String, String> param, HttpServletRequest httpServletRequest) throws IllegalAccessException {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        purposeService.checkApplyByApiIdAndMemberId(28L, member.getMemberId());

        URI uri = UriComponentsBuilder
                .fromUriString("http://localhost:9001")
                .path("/api/v1/asap/local/search/keyword/" + member.getWalletId() + "/28")
                .queryParams(param)
                .encode()
                .build()
                .toUri();

        try {
            HttpHeaders headers = new HttpHeaders();
            if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
                log.info("테스트로 진행");
                headers.set(HttpHeaders.AUTHORIZATION, testHeader);
            } else {
                headers.set(HttpHeaders.AUTHORIZATION, allowHeader); // 이 부분에서 헤더를 설정합니다.
            }

            HttpEntity<?> httpEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);
            if (Objects.requireNonNull(responseEntity.getBody()).toString().startsWith("{status")) {
                return ResponseEntity.status(Integer.parseInt(responseEntity.getBody().toString().substring(8, 11))).body(responseEntity.getBody());
            }
            return ResponseEntity.ok(responseEntity.getBody());

        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.ok(e.getMessage());
        }

    }

}
