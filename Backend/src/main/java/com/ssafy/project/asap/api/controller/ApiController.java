package com.ssafy.project.asap.api.controller;

import com.ssafy.project.asap.api.entity.domain.ApiCategory;
import com.ssafy.project.asap.api.entity.dto.response.FindApiResponse;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.api.entity.dto.response.GuideApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/apis")
@Tag(name="Api", description = "API관련 API")
public class ApiController {

    @GetMapping("/all")
    @Operation(summary = "API 전체 리스트", description = "사용 가능한 전체 API 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 리스트 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findAll(){

        // 전체 api 리스트 조회
        List<FindApisResponse> list = new ArrayList<>();

        list.add(FindApisResponse.builder()
                        .apiId(1L)
                        .title("제목1")
                        .content("내용1")
                        .createDate(LocalDateTime.now().minusDays(2))
                .build());

        list.add(FindApisResponse.builder()
                .apiId(2L)
                .title("제목2")
                .content("내용2")
                .createDate(LocalDateTime.now().minusDays(1))
                .build());

        return ResponseEntity.ok().body("전체 api 리스트 = " + list);

    }

    @GetMapping("/detail/{api_id}")
    @Operation(summary = "API 조회", description = "해당 API 상세 정보 조회 ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findByApiId(@PathVariable("api_id") Long apiId){

        // api 상세 조회
        FindApiResponse apiDetailResponse = FindApiResponse.builder()
                .apiId(1L)
                .title("api 제목")
                .content("api 내용")
                .address("api 지갑 주소")
                .price(5L)
                .input("입력 예시")
                .output("출력 예시")
                .provideDate(LocalDateTime.now().plusDays(2L))
                .createDate(LocalDateTime.now())
                .build();

        return ResponseEntity.ok().body("api 상세 조회 = " + apiDetailResponse);

    }

    @GetMapping("/guide/{api_id}")
    @Operation(summary = "API 조회", description = "해당 API 상세 정보 조회 ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<GuideApiResponse> guideByApiId(@PathVariable("api_id") Long apiId){

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
