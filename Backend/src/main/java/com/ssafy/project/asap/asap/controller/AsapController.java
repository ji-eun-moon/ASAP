package com.ssafy.project.asap.asap.controller;

import com.ssafy.project.asap.asap.domain.request.LocalSearch;
import com.ssafy.project.asap.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/v1/asap")
@RequiredArgsConstructor
@Slf4j
public class AsapController {

    private final MemberService memberService;
    private final String HEADERS = "8E6E21BF3296265C20F84D34F85DA9AA0FAFFFAD8B1BFA661B80FF8199BFA9D7";


    // https://j9c202.p.ssafy.io/block/api/v1/asap/local/search
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
                .path("/block/api/v1/asap/local/search/" + id)
                .queryParams(map)
                .encode()
                .build()
                .toUri();

        log.info(uri.toString());

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, HEADERS); // 이 부분에서 헤더를 설정합니다.

            HttpEntity<?> httpEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, JSONObject.class);

            return ResponseEntity.ok(responseEntity.getBody());

        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.ok(e.getMessage());
        }

    }

}
