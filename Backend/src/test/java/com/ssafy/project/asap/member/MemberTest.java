package com.ssafy.project.asap.member;


import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.entity.dto.request.RegisterMemberRequest;
import com.ssafy.project.asap.member.service.MemberService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
@Transactional
public class MemberTest {

    @Autowired
    private MemberService memberService;

    @Test
    @DisplayName("회원가입 성공")
    public void 회원가입_성공(){

        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
                .id("testId2")
                .password("testPassword")
                .email("asap2@ssafy.com")
                .name("ASAP")
                .build();

        memberService.signUp(registerMemberRequest);

        Member joinMember = memberService.findById(registerMemberRequest.getId());

        Assertions.assertEquals(joinMember.getId(), registerMemberRequest.getId());

    }

    @Test
    @DisplayName("회원가입 아이디 중복 실패")
    public void 회원가입_실패(){

        RegisterMemberRequest request1 = RegisterMemberRequest.builder()
                .id("testId2")
                .password("testPassword")
                .email("asap2@ssafy.com")
                .name("ASAP")
                .build();

        RegisterMemberRequest request2 = RegisterMemberRequest.builder()
                .id("testId2")
                .password("testPassword")
                .email("asap2@ssafy.com")
                .name("ASAP")
                .build();

        memberService.signUp(request1);

        Assertions.assertThrows(RuntimeException.class, () ->{
            memberService.signUp(request2);
        });

    }
}
