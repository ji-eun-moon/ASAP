package com.ssafy.project.asap.member.service;

import com.ssafy.project.asap.global.util.JwtUtil;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.entity.dto.request.CheckPasswordRequest;
import com.ssafy.project.asap.member.entity.dto.request.FindMemberIdRequest;
import com.ssafy.project.asap.member.entity.dto.request.LoginMemberRequest;
import com.ssafy.project.asap.member.entity.dto.request.RegisterMemberRequest;
import com.ssafy.project.asap.member.repository.MemberRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MemberService {

    @Value("${security.jwt.sercret.key}")
    private String secretKey;
    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();



    public Member findById(String id){

        return memberRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("회원이 없습니다."));

    }

    @Transactional
    public String login(LoginMemberRequest loginMemberRequest){
        
        Optional<Member> optionalMember = memberRepository.findById(loginMemberRequest.getId());
        
        if(optionalMember.isEmpty()){
            throw new RuntimeException("아이디 에러");
        }

        if(bCryptPasswordEncoder.matches(loginMemberRequest.getPassword(), optionalMember.get().getPassword())){

            byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(secretKey);

            Key key = new SecretKeySpec(secretKeyBytes, SignatureAlgorithm.HS256.getJcaName());

            Long accessExpiration = 1000 * 60 * 60 * 24L;
            return JwtUtil.createToken(loginMemberRequest.getId(), key, accessExpiration);
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

        memberRepository.findById(id)
                .ifPresent((e) -> {
                    throw new RuntimeException("이미 존재하는 ID입니다.");
                });

    }

    public Member findByEmailAndName(FindMemberIdRequest findMemberIdRequest){

        Optional<Member> optionalMember = memberRepository.findByEmailAndName(findMemberIdRequest.getEmail(), findMemberIdRequest.getName());

        if(optionalMember.isEmpty()){
            throw new RuntimeException("해당하는 회원은 존재하지 않습니다.");
        }

        return optionalMember.get();

    }

    public void updatePassword(LoginMemberRequest loginMemberRequest){

        Member member = memberRepository.findById(loginMemberRequest.getId()).get();

        member.setPassword(bCryptPasswordEncoder.encode(loginMemberRequest.getPassword()));

    }

    public void checkPassword(CheckPasswordRequest checkPasswordRequest){

        Member member =  memberRepository.findById(checkPasswordRequest.getId())
                .orElseThrow(() -> new RuntimeException("아이디가 틀렸습니다."));

        if(bCryptPasswordEncoder.matches(checkPasswordRequest.getPassword(), member.getPassword())){
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }
    }

}
