package com.ssafy.project.asap.api.controller;

import com.ssafy.project.asap.api.entity.domain.ApiCategory;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.api.entity.dto.response.GuideApiResponse;
import com.ssafy.project.asap.api.service.ApiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/apis")
@RequiredArgsConstructor
@Tag(name="Api", description = "API관련 API")
public class ApiController {

    private final ApiService apiService;

    @GetMapping("/all")
    @Operation(summary = "API 전체 리스트", description = "사용 가능한 전체 API 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 리스트 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<FindApisResponse>> findAll(){

        return ResponseEntity.ok(apiService.findAll());

    }

    @GetMapping("/detail/{apiId}")
    @Operation(summary = "API 조회", description = "해당 API 상세 정보 조회 ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findByApiId(@PathVariable("apiId") Long apiId){

        // api 상세 조회


        return ResponseEntity.ok("a");

    }

    @GetMapping("/guide/{api-id}")
    @Operation(summary = "API 조회", description = "해당 API 상세 정보 조회 ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<GuideApiResponse> guideByApiId(@PathVariable("api-id") Long apiId){

        GuideApiResponse guideApiResponse = GuideApiResponse.builder()
                .title("제목")
                .content("내용")
                .category(ApiCategory.TEAM)
                .input("input 예시")
                .output("output 예시")
                .build();

        return ResponseEntity.ok(guideApiResponse);

    }

}
