package com.ssafy.project.asap.member.service;

import com.ssafy.project.asap.global.util.JwtUtil;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.entity.dto.request.FindMemberIdRequest;
import com.ssafy.project.asap.member.entity.dto.request.LoginMemberRequest;
import com.ssafy.project.asap.member.entity.dto.request.RegisterMemberRequest;
import com.ssafy.project.asap.member.repository.MemberRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.transaction.Transactional;
import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    @Value("${security.jwt.sercret.key}")
    private String secretKey;
    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();


    @Transactional
    public Member findById(String id){

        Optional<Member> optionalMember = memberRepository.findById(id);

        if(optionalMember.isEmpty()){
            throw new RuntimeException("없는 아이디입니다.");
        }

        return optionalMember.get();

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

    @Transactional
    public void signUp(RegisterMemberRequest registerMemberRequest){

        Member member = Member.builder()
                .email(registerMemberRequest.getEmail())
                .id(registerMemberRequest.getId())
                .password(bCryptPasswordEncoder.encode(registerMemberRequest.getPassword()))
                .name(registerMemberRequest.getName())
                .build();

        memberRepository.save(member);

    }

    @Transactional
    public void checkId(String id){

        Optional<Member> optionalMember = memberRepository.findById(id);

        log.info("checkId");

        if(optionalMember.isPresent()){
            log.error("아이디 중복");
            throw new RuntimeException("아이디 중복");
        }

    }

    @Transactional
    public Member findByEmailAndName(FindMemberIdRequest findMemberIdRequest){

        Optional<Member> optionalMember = memberRepository.findByEmailAndName(findMemberIdRequest.getEmail(), findMemberIdRequest.getName());

        if(optionalMember.isEmpty()){
            throw new RuntimeException("해당하는 회원은 존재하지 않습니다.");
        }

        return optionalMember.get();

    }

}
