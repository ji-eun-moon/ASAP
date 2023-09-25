package com.core.apiserver.daily.controller;

import com.core.apiserver.daily.entity.dto.request.DailyUsageRequest;
import com.core.apiserver.daily.entity.dto.request.GetDailyRequest;
import com.core.apiserver.daily.entity.dto.request.MonthlyUsageRequest;
import com.core.apiserver.daily.entity.dto.response.UsageResponse;
import com.core.apiserver.daily.service.DailyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/usage")
@Tag(name = "daily", description = "일간, 월간 조회")
public class DailyController {

    private final DailyService dailyService;

    @GetMapping("/monthly")
    @Operation(summary = "월간 조회", description = "월간 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<UsageResponse>> monthly(@RequestBody MonthlyUsageRequest monthlyUsageRequest) {

        return ResponseEntity.status(200).body(dailyService.monthlyUsage(monthlyUsageRequest));
    }

    @PostMapping("/daily/register")
    @Operation(summary = "일간 생성", description = "일간 사용량 생성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "일간 사용량 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody DailyUsageRequest dailyUsageRequest) {
        dailyService.register(dailyUsageRequest);
        return ResponseEntity.status(200).body("");
    }

    @PutMapping ("/daily/update")
    @Operation(summary = "월간 사용량 추가", description = "월간 사용량 추가")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "API 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> update(@RequestBody DailyUsageRequest dailyUsageRequest) {
        dailyService.update(dailyUsageRequest);
        return ResponseEntity.status(202).body("");
    }

    @GetMapping ("/daily")
    @Operation(summary = "일간 사용량 조회", description = "일간 사용량 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "일간 사용량 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> daily(@RequestBody GetDailyRequest getDailyRequest) {
        return ResponseEntity.status(202).body(dailyService.dailyUsage(getDailyRequest));
    }
}
