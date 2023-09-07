package com.ssafy.project.asap.api.controller;

import com.ssafy.project.asap.api.entity.dto.request.ApiCategoryRequest;
import com.ssafy.project.asap.api.entity.dto.request.ApiUseRequest;
import com.ssafy.project.asap.api.entity.dto.response.ApiDetailResponse;
import com.ssafy.project.asap.api.entity.dto.response.ApiListResponse;
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
@RequestMapping("api/v1/apis")
public class ApiController {

    @GetMapping("/all")
    @Operation(summary = "API 전체 리스트", description = "사용 가능한 전체 API 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 리스트 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> all(){

        // 전체 api 리스트 조회
        List<ApiListResponse> list = new ArrayList<>();

        list.add(ApiListResponse.builder()
                        .apiId(1L)
                        .title("제목1")
                        .content("내용1")
                        .createDate(LocalDateTime.now().minusDays(2))
                .build());

        list.add(ApiListResponse.builder()
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
    public ResponseEntity<?> detail(@PathVariable("api_id") Long apiId){

        // api 상세 조회
        ApiDetailResponse apiDetailResponse = ApiDetailResponse.builder()
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

    @PostMapping("/use")
    @Operation(summary = "API 사용 (사용자)", description = "사용자가 해당 API 사용 신청")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 사용 신청 완료", content = @Content(schema =  @Schema(
                    implementation = ApiUseRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> use(){

        // api 신청 하기
        ApiUseRequest apiUseRequest = ApiUseRequest.builder()
                .category(ApiCategoryRequest.INDIVIDUAL)
                .purpose("제 개인 프로젝트를 위함인데요??")
                .build();

        return ResponseEntity.ok().body("api 사용 신청 완료 = " + apiUseRequest);

    }
}
