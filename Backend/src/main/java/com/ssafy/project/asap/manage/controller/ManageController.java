package com.ssafy.project.asap.manage.controller;

import com.ssafy.project.asap.errors.entity.dto.response.ErrorsResponse;
import com.ssafy.project.asap.manage.entity.dto.request.LoginManageRequest;
import com.ssafy.project.asap.monthlyUsage.entity.dto.response.MonthlyUsageDetailResponse;
import com.ssafy.project.asap.monthlyUsage.entity.dto.response.MonthlyUsageResponse;
import com.ssafy.project.asap.monthlyUsage.entity.dto.response.TotalMonthlyUsageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@Tag(name = "Manage", description = "관리자 API")
public class ManageController {

    @PostMapping("/login")
    @Operation(summary = "관리자 로그인", description = "관리자 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "관리자 로그인"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findUsage(@RequestBody LoginManageRequest loginManageRequest){

        return ResponseEntity.status(201).body("로그인 성공");
    }

    @PostMapping("/delete/{apiId}")
    @Operation(summary = "api 관리자 삭제", description = "api 관리자 삭제")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "삭제"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findUsage(@PathVariable Long apiId, @RequestBody LoginManageRequest loginManageRequest){

        return ResponseEntity.status(204).body("삭제완료");
    }
}
