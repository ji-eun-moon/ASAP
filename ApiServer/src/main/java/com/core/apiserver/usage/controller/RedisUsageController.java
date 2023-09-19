package com.core.apiserver.usage.controller;

import com.core.apiserver.usage.entity.dto.request.CreateRedisUsageRequest;
import com.core.apiserver.usage.entity.dto.response.RedisUsageResponse;
import com.core.apiserver.usage.service.RedisUsageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/usage")
@Tag(name="Usage", description = "사용량 관련 API")
public class RedisUsageController {

    private final RedisUsageService redisUsageService;

    @PostMapping ("")
    @Operation(summary = "레디스 Usage 생성", description = "레디스 테이블 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "사용량 집계"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<RedisUsageResponse> usageCreate(@RequestBody CreateRedisUsageRequest createRedisUsageRequest) {
        RedisUsageResponse redisUsageResponse = new RedisUsageResponse(redisUsageService.save(createRedisUsageRequest));

        return ResponseEntity.status(201).body(redisUsageResponse);
    }
}
