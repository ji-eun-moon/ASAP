package com.ssafy.project.asap.apply.entity.dto.response;

import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class FindApplyResponse {

    private Long applyId;
    private Long memberId;
    private Long apiId;
    private String api;
    private String input;
    private String output;
    private Long price;
    private ApplyProgress progress;
    private String title;
    private String content;
    private LocalDateTime provideDate;
    private LocalDateTime createDate;

}
