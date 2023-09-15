package com.ssafy.project.asap.monthlyUsage.controller;

import com.ssafy.project.asap.api.entity.domain.ApiCategory;
import com.ssafy.project.asap.api.entity.dto.request.RegisterApiRequest;
import com.ssafy.project.asap.api.entity.dto.response.FindApiResponse;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.errors.entity.dto.response.ErrorsResponse;
import com.ssafy.project.asap.monthlyUsage.entity.dto.response.MonthlyUsageDetailResponse;
import com.ssafy.project.asap.monthlyUsage.entity.dto.response.MonthlyUsageResponse;
import com.ssafy.project.asap.monthlyUsage.entity.dto.response.TotalMonthlyUsageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/monthly")
public class MonthlyUsageController {

    @GetMapping("/usage")
    @Operation(summary = "API 사용량", description = "사용한 전체 API 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 사용량 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findUsage(){

        return getResponseEntity();
    }

    @GetMapping("/provided")
    @Operation(summary = "API 제공한", description = "제공한 전체 API 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 제공량 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findProvided(){

        return getResponseEntity();
    }

    @GetMapping("/provided/detail/{apiId}")
    @Operation(summary = "API 제공한", description = "제공한 전체 API 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 제공량 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findProvidedDetail(@PathVariable Long apiId){

        MonthlyUsageResponse monthlyUsageResponse = new MonthlyUsageResponse("밤톨이 건강 상태 조회 API", 50, 2500);
        List<ErrorsResponse> errorsResponses = new ArrayList<>();
        errorsResponses.add(new ErrorsResponse("404-Forbidden", 34));
        errorsResponses.add(new ErrorsResponse("502-ServerError", 65));
        errorsResponses.add(new ErrorsResponse("403-RuntimeError", 12));

        MonthlyUsageDetailResponse monthlyUsageDetailResponse =
                new MonthlyUsageDetailResponse(monthlyUsageResponse, 52, errorsResponses);

        return ResponseEntity.ok(monthlyUsageDetailResponse);
    }

    private ResponseEntity<?> getResponseEntity() {
        List<MonthlyUsageResponse> monthlyUsageResponses = new ArrayList<>();

        monthlyUsageResponses.add(new MonthlyUsageResponse("침수차 차량 조회 API", 50, 2500));
        monthlyUsageResponses.add(new MonthlyUsageResponse("밤톨이 건강 상태 조회 API", 50, 2500));
        monthlyUsageResponses.add(new MonthlyUsageResponse("맛집 조회 API", 50, 2500));

        TotalMonthlyUsageResponse totalMonthlyUsageResponse = new TotalMonthlyUsageResponse(7500, monthlyUsageResponses);


        return ResponseEntity.ok(totalMonthlyUsageResponse);
    }


}
