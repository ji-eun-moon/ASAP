package com.ssafy.project.asap.apply.controller;

import com.ssafy.project.asap.apply.entity.domain.progress;
import com.ssafy.project.asap.apply.entity.dto.request.ApplyListRequest;
import com.ssafy.project.asap.apply.entity.dto.request.ApplyProgressRequest;
import com.ssafy.project.asap.apply.entity.dto.request.ApplySubmitRequest;
import com.ssafy.project.asap.apply.entity.dto.response.ApplyDetailResponse;
import com.ssafy.project.asap.apply.entity.dto.response.ApplyListResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/apply")
public class ApplyController {

    @GetMapping("/check-apply/{api_id}")
    public ResponseEntity<?> checkApply(@PathVariable("api_id") Long apiId){

        // 신청내역 상세 조회
        ApplyDetailResponse applyDetailResponse = ApplyDetailResponse.builder()
                .applyId(1L)
                .memberId(1L)
                .apiId(1L)
                .title("카카오 맵 조회")
                .content("카카오 맵 조회해서 띄우기")
                .price(1L)
                .progress(progress.진행중)
                .provideDate(LocalDateTime.now().plusDays(2))
                .createDate(LocalDateTime.now())
                .api("kakao/api/map")
                .build();

        return ResponseEntity.ok().body(applyDetailResponse);

    }

    @GetMapping("/my-list")
    public ResponseEntity<?> myList(@RequestBody ApplyListRequest applyListRequest){

        List<ApplyListResponse> list = new ArrayList<>();

        list.add(ApplyListResponse.builder()
                        .applyId(1L)
                        .title("신청 내역 리스트")
                        .progress(progress.대기중)
                        .createDate(LocalDateTime.now().minusDays(1))
                        .modifyDate(LocalDateTime.now())
                .build());


        return ResponseEntity.ok().body("내 신청내역 리스트 = " + list);

    }

    @PostMapping("/submit")
    public ResponseEntity<?> submit(@RequestBody ApplySubmitRequest applySubmitRequest){

        // API 사용 신청 (제공자 입장)


        return ResponseEntity.ok().body(applySubmitRequest);

    }

    @PostMapping("/list")
    public ResponseEntity<?> list(){

        // 모든 리스트 조회 (사용자 입장)


        return ResponseEntity.ok().body("모든 리스트 (관리자 입장)");
    }

    @PostMapping("/progress")
    public ResponseEntity<?> progress(@RequestBody ApplyProgressRequest applyProgressRequest){

        // API 진행 상태 변경


        return ResponseEntity.ok().body(applyProgressRequest.getApplyId() + "번 진행상태 " + applyProgressRequest.getProgress() + "상태로 변경");

    }

    @PostMapping("/complete")
    public ResponseEntity<?> complete(@RequestBody Long applyId){

        // 완료 상태로 변경
        // 완료 상태라면 API 싱청 리시트에서 기본 리스트로 이동해야함


        return ResponseEntity.ok().body(applyId + "번 신청 API 제공 완료 ");

    }



}
