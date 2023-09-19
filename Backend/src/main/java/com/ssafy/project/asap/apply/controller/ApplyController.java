package com.ssafy.project.asap.apply.controller;

import com.ssafy.project.asap.apply.entity.dto.request.RegisterApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.request.UpdateApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.response.FindApplyResponse;
import com.ssafy.project.asap.apply.entity.dto.response.FindApplysResponse;
import com.ssafy.project.asap.apply.service.ApplyService;
import com.ssafy.project.asap.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/apply")
@RequiredArgsConstructor
@Tag(name="Apply", description = "신청 관련 API")
@Slf4j
public class ApplyController {

    private final ApplyService applyService;
    private final MemberService memberService;

    @GetMapping("/detail/{apply_id}")
    @Operation(summary = "신청내역 상세 조회 (제공자)", description = "제공자가 관리자에게 신청한 API 상세 정보 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 상세 정보 조회 성공", content = @Content(schema = @Schema(
                    implementation = FindApplyResponse.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<FindApplyResponse> findByApplyId(@PathVariable("apply_id") Long applyId){

        // 신청 내역 상세 조회
        FindApplyResponse findApplyResponse = applyService.findByApplyId(applyId);

        return ResponseEntity.ok(findApplyResponse);

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
    public ResponseEntity<?> findAll(Authentication authentication){

        List<FindApplysResponse> list = applyService.findByMember(memberService.findById(authentication.getName()));

        return ResponseEntity.ok(list);

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
    public ResponseEntity<?> register(@RequestBody RegisterApplyRequest registerApplyRequest, Authentication authentication){

        // API 사용 신청 (제공자 입장)
        applyService.signup(registerApplyRequest, authentication.getName());

        return ResponseEntity.ok(registerApplyRequest);

    }

    @GetMapping("/list")
    @Operation(summary = "API 리스트 조회 (관리자)", description = "관리자가 제공자들이 신청한 모든 API 리스트 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "API 리스트 조회 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<FindApplysResponse>> findAllForAdmin(){

        // 모든 리스트 조회 (관리자 입장)
        List<FindApplysResponse> list = applyService.findAll();

        return ResponseEntity.ok(list);

    }

    @PutMapping  ("/progress")
    @Operation(summary = "API 진행 상태 변경 (관리자)", description = "관리자가 제공자가 신청한 해당 API 신청 상태 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "API 신청 상태 변경 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> updateProgress(@RequestBody UpdateApplyRequest updateApplyRequest){

        // API 진행 상태 변경
        applyService.updateProgress(updateApplyRequest);

        return ResponseEntity.status(202).body(updateApplyRequest.getApplyId() + "번 진행상태 " + updateApplyRequest.getProgress() + "상태로 변경");

    }

}
