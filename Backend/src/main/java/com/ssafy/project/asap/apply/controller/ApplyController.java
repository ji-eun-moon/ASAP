package com.ssafy.project.asap.apply.controller;

import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import com.ssafy.project.asap.apply.entity.dto.request.RegisterApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.request.UpdateApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.response.FindApplyResponse;
import com.ssafy.project.asap.apply.entity.dto.response.FindApplysResponse;
import com.ssafy.project.asap.apply.service.ApplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/v1/apply")
@RequiredArgsConstructor
public class ApplyController {

    private final ApplyService applyService;

    @GetMapping("/check-apply/{api_id}")
    @Operation(summary = "신청내역 상세 조회 (제공자)", description = "제공자가 관리자에게 신청한 API 상세 정보 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공", content = @Content(schema = @Schema(
                    implementation = FindApplyResponse.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findByApplyId(@PathVariable("api_id") Long apiId){

        // 신청내역 상세 조회
        FindApplyResponse applyDetailResponse = FindApplyResponse.builder()
                .applyId(1L)
                .memberId(1L)
                .apiId(1L)
                .title("카카오 맵 조회")
                .content("카카오 맵 조회해서 띄우기")
                .price(1L)
                .progress(ApplyProgress.진행중)
                .provideDate(LocalDateTime.now().plusDays(2))
                .createDate(LocalDateTime.now())
                .api("kakao/api/map")
                .build();

        return ResponseEntity.ok().body(applyDetailResponse);

    }

    @GetMapping("/my-list")
    @Operation(summary = "신청 리스트 조회 (제공자)", description = "제공가자 관리자에게 신청한 모든 API 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 신청 리스트 조회 성공", content = @Content(schema = @Schema(
                    implementation = FindApplysResponse.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findAll(@RequestBody FindApplysResponse findApplysResponse){

        List<FindApplysResponse> list = new ArrayList<>();

        list.add(FindApplysResponse.builder()
                        .applyId(1L)
                        .title("신청 내역 리스트")
                        .progress(ApplyProgress.대기중)
                        .createDate(LocalDateTime.now().minusDays(1))
                        .modifyDate(LocalDateTime.now())
                .build());


        return ResponseEntity.ok().body("내 신청내역 리스트 = " + list);

    }

    @PostMapping("/submit")
    @Operation(summary = "API 사용 신청 (제공자)", description = "제공자가 관리자에게 본인 API 사용 신청")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 신청 성공", content = @Content(schema = @Schema(
                    implementation = RegisterApplyRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody RegisterApplyRequest registerApplyRequest){

        // API 사용 신청 (제공자 입장)


        return ResponseEntity.ok().body(registerApplyRequest);

    }

    @GetMapping("/list")
    @Operation(summary = "API 리스트 조회 (관리자)", description = "관리자가 제공자들이 신청한 모든 API 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 리스트 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> findAll(){

        // 모든 리스트 조회 (관리자 입장)


        return ResponseEntity.ok().body("모든 리스트 (관리자 입장)");
    }

    @PatchMapping ("/progress")
    @Operation(summary = "API 진행 상태 변경 (관리자)", description = "관리자가 제공자가 신청한 해당 API 신청 상태 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 신청 상태 변경 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> updateProgress(@RequestBody UpdateApplyRequest updateApplyRequest){

        // API 진행 상태 변경


        return ResponseEntity.ok().body(updateApplyRequest.getApplyId() + "번 진행상태 " + updateApplyRequest.getProgress() + "상태로 변경");

    }

    @PostMapping("/complete")
    @Operation(summary = "API 신청 허가 (관리자)", description = "관리자가 해당 API 신청 허가 = API 테이블로 이동")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 허가 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> updateComplete(@RequestBody Long applyId){

        // 완료 상태로 변경
        // 완료 상태라면 API 싱청 리시트에서 기본 리스트로 이동해야함


        return ResponseEntity.ok().body(applyId + "번 신청 API 제공 완료 ");

    }



}
