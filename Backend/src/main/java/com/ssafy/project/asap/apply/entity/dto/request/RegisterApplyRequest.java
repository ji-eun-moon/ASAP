package com.ssafy.project.asap.apply.entity.dto.request;

import com.ssafy.project.asap.apply.entity.domain.ApplyMethod;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class RegisterApplyRequest {

    private String title;
    private String content;
    private String input;
    private String output;
    private ApplyMethod method;
    private Long price;
    private String api;
    private String tags;
    private LocalDateTime provideDate;

}
