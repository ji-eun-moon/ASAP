package com.core.apiserver.api.controller;

import com.core.apiserver.api.service.ApiService;
import com.core.apiserver.usage.entity.dto.request.CreateRedisUsageRequest;
import com.core.apiserver.usage.service.RedisUsageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/asap")
@Tag(name = "OPEN API", description = "실제 서비스 될 API")
public class OpenApiController {

    private final ApiService apiService;
    private final RedisUsageService redisUsageService;
    @Value("${server.allow-header}")
    private String allowHeader;

    @GetMapping("/local/search/address/{wallet-id}/{api-id}")
    @Operation(summary = "로컬 지도", description = "query를 통해 로컬지도정보 입력받음")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "검색 결과"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<JSONObject> kakaoLocal(HttpServletRequest httpServletRequest,
                                                 @RequestParam Map<String, String> param,
                                                 @PathVariable(value = "wallet-id") Long walletId,
                                                 @PathVariable(value = "api-id") Long apiId) throws Exception {
        if (param.get("query").isEmpty()) {
            throw new IllegalArgumentException("query 값은 필수 입니다.");
        }

        System.out.println("header : " + httpServletRequest.getHeader("Authorization"));
        if (httpServletRequest.getHeader("Authorization").equals(allowHeader)) {
            CreateRedisUsageRequest createRedisUsageRequest = new CreateRedisUsageRequest(walletId,
                    apiService.findProviderIdById(apiId), apiId);

            redisUsageService.save(createRedisUsageRequest);
        }

        return ResponseEntity.ok(apiService.kakaoLocal(param));
    }

    @GetMapping("/local/search/keyword/{wallet-id}/{api-id}")
    @Operation(summary = "로컬 지도", description = "query를 통해 로컬지도정보 입력받음")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "검색 결과"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> kakaoLocalKeyWord(HttpServletRequest httpServletRequest,
                                                 @RequestParam MultiValueMap<String, String> param,
                                                 @PathVariable(value = "wallet-id") Long walletId,
                                                 @PathVariable(value = "api-id") Long apiId) throws Exception {

        if (httpServletRequest.getHeader("Authorization").equals(allowHeader)) {
            CreateRedisUsageRequest createRedisUsageRequest = new CreateRedisUsageRequest(walletId,
                    apiService.findProviderIdById(apiId), apiId);

            redisUsageService.save(createRedisUsageRequest);
        }

        return ResponseEntity.ok(apiService.kakaoLocalKeyword(param));
    }
}
