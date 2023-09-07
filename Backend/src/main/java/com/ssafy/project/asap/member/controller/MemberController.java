package com.ssafy.project.asap.member.controller;

import com.ssafy.project.asap.member.entity.dto.request.*;
import com.ssafy.project.asap.member.entity.dto.response.MemberInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.module.FindException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
@Tag(name="Member", description = "회원 API")
public class MemberController {

    @PostMapping("/signup")
    @Operation(summary = "회원가입", description = "이메일, 아이디, 비밀번호, 이름을 통해 회원가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원 가입 성공", content = @Content(schema = @Schema(
                    implementation = CreateMemberRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> registerMember(@RequestBody CreateMemberRequest createMemberRequest) {
        return ResponseEntity.status(201).body("");
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
                    implementation = EmailCheckRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> authEmail(@RequestBody EmailCheckRequest emailCheckRequest) {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "아이디, 비밀번호를 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok("토큰 어쩌고 저쩌고");
    }

    @PostMapping("/find-id")
    @Operation(summary = "아이디 찾기", description = "이메일, 이름을 통해 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이디 리스트 제공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<List<String>> findIdByEmailAndName(@RequestBody FindException findException) {

        List<String> ids = new ArrayList<>();
        ids.add("시온");
        ids.add("지은");
        ids.add("도하");

        return ResponseEntity.ok(ids);
    }

    @PostMapping("/find-password")
    @Operation(summary = "비밀번호 변경 주소 발송", description = "새로운 비빌번호 변경을 위해 가능한 URL이 담겨있는 메일 전송")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "메일 발송 성공"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> findPassword(@RequestBody FindPasswordRequest findPasswordRequest) {

        return ResponseEntity.ok(true);
    }

    @PostMapping("/change-password")
    @Operation(summary = "비밀번호 변경", description = "새로운 비밀번호 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "새로운 비밀 번호 변경 완료"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<Boolean> ChangePassword(@RequestHeader String hashToken, @RequestBody LoginRequest loginRequest) {

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
    public ResponseEntity<Boolean> logout(@RequestHeader Authentication authentication) {

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
    public ResponseEntity<MemberInfoResponse> memberInfo(@RequestHeader Authentication authentication) {

        return ResponseEntity.ok(new MemberInfoResponse());
    }

    @PostMapping("/me")
    @Operation(summary = "개인정보 수정", description = "이름, 이메일 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "개인 정보 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<MemberInfoResponse> updateMember(@RequestHeader Authentication authentication,
                                                           @RequestBody UpdataMemberRequest updataMemberRequest) {

        return ResponseEntity.ok(new MemberInfoResponse());
    }
}
