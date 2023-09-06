package com.ssafy.project.asap.api.controller;

import com.ssafy.project.asap.api.entity.dto.request.ApiCategoryRequest;
import com.ssafy.project.asap.api.entity.dto.request.ApiUseRequest;
import com.ssafy.project.asap.api.entity.dto.response.ApiDetailResponse;
import com.ssafy.project.asap.api.entity.dto.response.ApiListResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/apis")
public class ApiController {

    @GetMapping("/all")
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
    public ResponseEntity<?> use(){

        // api 신청 하기
        ApiUseRequest apiUseRequest = ApiUseRequest.builder()
                .category(ApiCategoryRequest.INDIVIDUAL)
                .purpose("제 개인 프로젝트를 위함인데요??")
                .build();

        return ResponseEntity.ok().body("api 사용 신청 완료 = " + apiUseRequest);

    }
}
