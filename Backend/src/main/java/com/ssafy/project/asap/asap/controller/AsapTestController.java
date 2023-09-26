package com.ssafy.project.asap.asap.controller;

import com.ssafy.project.asap.asap.domain.request.LocalSearch;
import com.ssafy.project.asap.member.service.MemberService;
import com.ssafy.project.asap.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/v1/asap/test")
@RequiredArgsConstructor
@Slf4j
public class AsapTestController {

    private final MemberService memberService;
    private final RedisService redisService;
    @Value("${server.test-header}")
    private String testHeader;

    @GetMapping("/local/search/address.json")
    public ResponseEntity<?> LocalSearch(@RequestBody LocalSearch localSearch, Authentication authentication){

        String testId = authentication.getName();

        log.info("testId = " + testId);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

        map.put("analyze_type", Collections.singletonList(localSearch.getAnalyze_type()));
        map.put("query", Collections.singletonList(localSearch.getQuery()));

        return ResponseEntity.ok("hi");

    }

}
