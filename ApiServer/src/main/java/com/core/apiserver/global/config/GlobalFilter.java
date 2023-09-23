package com.core.apiserver.global.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.Objects;

@Slf4j
@Component
public class GlobalFilter implements Filter {

    @Value("${server.allow-header}")
    private String requireHeader;

    @Value("${server.test-header}")
    private String testHeader;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        ContentCachingRequestWrapper httpServletRequest = new ContentCachingRequestWrapper((HttpServletRequest) request);


        String header = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

        if (header == null) {
//            chain.doFilter(request, response);
            log.info("헤더가 없음");
            throw new IllegalAccessError();
        }

        if (!Objects.equals(requireHeader, header) && !Objects.equals(testHeader, header)) {
//            chain.doFilter(request, response);
            log.info("헤더가 서로 다름");
            throw new IllegalAccessError();
        }
        log.info("headers" + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        chain.doFilter(request, response);
    }

}
