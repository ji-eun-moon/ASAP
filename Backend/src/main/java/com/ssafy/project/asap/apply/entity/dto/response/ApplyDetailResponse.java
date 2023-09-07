package com.ssafy.project.asap.apply.entity.dto.response;

import com.ssafy.project.asap.apply.entity.domain.progress;
import lombok.Builder;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
public class ApplyDetailResponse {

    private Long applyId;
    private Long memberId;
    private Long apiId;
    private String api;
    private String input;
    private String output;
    private Long price;
    private progress progress;
    private String title;
    private String content;
    private LocalDateTime provideDate;
    private LocalDateTime createDate;

}
