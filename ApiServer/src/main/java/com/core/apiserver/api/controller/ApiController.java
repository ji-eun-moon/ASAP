package com.core.apiserver.api.controller;

import com.core.apiserver.api.entity.dto.request.CreateApiRequest;
import com.core.apiserver.api.service.ApiService;
import com.core.apiserver.usage.entity.domain.RedisUsage;
import com.core.apiserver.usage.entity.dto.request.CreateRedisUsageRequest;
import com.core.apiserver.usage.entity.dto.response.RedisUsageResponse;
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
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/asap")
@Tag(name = "API", description = "API 관련 API")
public class ApiController {

    private final ApiService apiService;
    private final RedisUsageService redisUsageService;
    @Value("${spring.test-header")
    private String testHeader;

    @PostMapping("/register")
    @Operation(summary = "API 생성", description = "관리자를 통해 API 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "API 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<com.core.apiserver.api.entity.dto.response.ApiResponse> regiser(@RequestBody CreateApiRequest createApiRequest) {
        return ResponseEntity.status(201).body(new com.core.apiserver.api.entity.dto.response.ApiResponse(apiService.save(createApiRequest)));
    }

    @GetMapping("/local/search/{wallet-id}")
    @Operation(summary = "로컬 지도", description = "query를 통해 로컬지도정보 입력받음")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "검색 결과"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<JSONObject> kakaoLocal(@RequestParam Map<String, String> param,
                                                 @PathVariable(value = "wallet-id") Long walletId) throws Exception {
        if (param.get("query").isEmpty()) {
            throw new IllegalArgumentException("query 값은 필수 입니다.");
        }

        if (!HttpHeaders.AUTHORIZATION.equals(testHeader)) {
            CreateRedisUsageRequest createRedisUsageRequest = new CreateRedisUsageRequest(walletId,
                    apiService.findProviderIdById(4L), 4L);

            redisUsageService.save(createRedisUsageRequest);
        }

        return ResponseEntity.ok(apiService.kakaoLocal(param));
    }
}