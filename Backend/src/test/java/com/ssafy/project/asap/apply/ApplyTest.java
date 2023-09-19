package com.ssafy.project.asap.apply;

import com.ssafy.project.asap.apply.entity.dto.request.RegisterApplyRequest;
import com.ssafy.project.asap.apply.service.ApplyService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Transactional
@SpringBootTest
public class ApplyTest {

    @Autowired
    private ApplyService applyService;

    @Test
    @DisplayName("API 등록 성공")
    public void API_등록_성공(){

        RegisterApplyRequest request = RegisterApplyRequest.builder()
                .title("title")
                .content("content")
                .input("input")
                .output("output")
                .price(1L)
                .api("https://localhost")
                .provideDate(LocalDateTime.now().plusDays(2))
                .build();

        applyService.signup(request, "asap");

    }

}
