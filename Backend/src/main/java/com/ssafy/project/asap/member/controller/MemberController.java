package com.ssafy.project.asap.member.controller;

import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.entity.dto.request.*;
import com.ssafy.project.asap.member.entity.dto.response.FindMemberResponse;
import com.ssafy.project.asap.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
@Tag(name="Member", description = "회원 API")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입", description = "이메일, 아이디, 비밀번호, 이름을 통해 회원가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원 가입 성공", content = @Content(schema = @Schema(
                    implementation = Member.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> register(@RequestBody RegisterMemberRequest registerMemberRequest) {

        memberService.signUp(registerMemberRequest);

        Member member = memberService.findById(registerMemberRequest.getId());

        return ResponseEntity.status(201).body(member);
    }

    @PostMapping("/check-id")
    @Operation(summary = "아이디 중복확인", description = "아이디 사용가능하면 true, 없다면 false")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이디 사용가능"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> checkId(@RequestBody String id) {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/auth-email")
    @Operation(summary = "이메일 인증 전송", description = "이메일 인증 메일 전송")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 인증 발송"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> authEmail(@RequestBody String email) {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/check-auth-email")
    @Operation(summary = "이메일 인증 확인", description = "이메일 인증 메일 코드 확인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 인증 성공", content = @Content(schema = @Schema(
                    implementation = CheckMemberEmailRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> authEmail(@RequestBody CheckMemberEmailRequest checkMemberEmailRequest) {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "아이디, 비밀번호를 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공", content = @Content(schema = @Schema(
                    implementation = LoginMemberRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> login(@RequestBody LoginMemberRequest loginMemberRequest) {

        String token = memberService.login(loginMemberRequest);

        return ResponseEntity.ok(token);
    }

    @PostMapping("/find-id")
    @Operation(summary = "아이디 찾기", description = "이메일, 이름을 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이디 리스트 제공", content = @Content(schema = @Schema(
                    implementation = FindMemberIdRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<String>> findByEmailAndName(@RequestBody FindMemberIdRequest findMemberIdRequest) {

        List<String> ids = new ArrayList<>();
        ids.add("시온");
        ids.add("지은");
        ids.add("도하");

        return ResponseEntity.ok(ids);
    }

    @PostMapping("/find-password")
    @Operation(summary = "비밀번호 변경 주소 발송", description = "새로운 비빌번호 변경을 위해 가능한 URL이 담겨있는 메일 전송")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "메일 발송 성공", content = @Content(schema = @Schema(
                    implementation = FindMemberPasswordRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> findPassword(@RequestBody FindMemberPasswordRequest findMemberPasswordRequest) {

        return ResponseEntity.ok(true);
    }

    @PostMapping("/change-password")
    @Operation(summary = "비밀번호 변경", description = "새로운 비밀번호 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "새로운 비밀 번호 변경 완료", content = @Content(schema = @Schema(
                    implementation = LoginMemberRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> updatePassword(@RequestBody LoginMemberRequest loginMemberRequest) {

        return ResponseEntity.ok(true);
    }

    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "JWT 토큰 반환")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> logout() {

        return ResponseEntity.ok(true);
    }

    @GetMapping("/me")
    @Operation(summary = "개인정보 조회", description = "이메일, 이름, 지갑 정보, 잔고 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "개인 정보 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<FindMemberResponse> findByMemberId() {

        return ResponseEntity.ok(new FindMemberResponse());
    }

    @PostMapping("/me")
    @Operation(summary = "개인정보 수정", description = "이름, 이메일 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "개인 정보 조회", content = @Content(schema = @Schema(
                    implementation = UpdateMemberRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<UpdateMemberRequest> update(@RequestBody UpdateMemberRequest updateMemberRequest) {

        return ResponseEntity.status(202).body(new UpdateMemberRequest());
    }

}
