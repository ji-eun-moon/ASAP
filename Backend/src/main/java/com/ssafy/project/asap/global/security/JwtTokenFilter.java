package com.ssafy.project.asap.global.security;

import com.ssafy.project.asap.global.util.JwtUtil;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.service.MemberService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {

    private final MemberService memberService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("requestHeader = " + requestHeader);

        // 토큰이 없는 경우
        if(requestHeader == null){
            filterChain.doFilter(request, response);
            return ;
        }

        // 토큰이 잘못된 형태인 경우
        if(!requestHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return ;
        }

        // 토큰 분리
        String token = requestHeader.split(" ")[1];

        // 토큰이 만료되었을 경우
        if(JwtUtil.isExpired(token)){
            filterChain.doFilter(request, response);
            return ;
        }

        // 아이디 추출
        String loginId = JwtUtil.getId(token);

        Member member = memberService.findById(loginId);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                member.getId(), null, null
        );
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request, response);
    }

}
