package com.ssafy.project.asap.member.service;

import com.ssafy.project.asap.global.util.JwtUtil;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.entity.dto.request.LoginMemberRequest;
import com.ssafy.project.asap.member.entity.dto.request.RegisterMemberRequest;
import com.ssafy.project.asap.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


    public Member findById(String id){

        Optional<Member> optionalMember = memberRepository.findById(id);

        if(optionalMember.isEmpty()){
            throw new RuntimeException("아이디 에러");
        }

        return optionalMember.get();

    }
    
    public String login(LoginMemberRequest loginMemberRequest){
        
        Optional<Member> optionalMember = memberRepository.findById(loginMemberRequest.getId());
        
        if(optionalMember.isEmpty()){
            throw new RuntimeException("아이디 에러");
        }
        
        if(bCryptPasswordEncoder.matches(loginMemberRequest.getPassword(), optionalMember.get().getPassword())){
            return JwtUtil.createToken(loginMemberRequest.getId());
        }else{
            throw new RuntimeException("비밀번호 에러");
        }
        
    }

    public void signUp(RegisterMemberRequest registerMemberRequest){

        Member member = Member.builder()
                .email(registerMemberRequest.getEmail())
                .id(registerMemberRequest.getId())
                .password(bCryptPasswordEncoder.encode(registerMemberRequest.getPassword()))
                .name(registerMemberRequest.getName())
                .build();

        memberRepository.save(member);

    }

    public void checkId(String id){

        Optional<Member> optionalMember = memberRepository.findById(id);

        if(optionalMember.isPresent()){
            throw new RuntimeException("아이디 중복");
        }

    }

}
