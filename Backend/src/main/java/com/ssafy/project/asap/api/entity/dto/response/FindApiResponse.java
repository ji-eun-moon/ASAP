package com.ssafy.project.asap.api.entity.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class FindApiResponse {

    private Long apiId;
    private Long memberId;
    private String api;
    private String input;
    private String output;
    private Long price;
    private String address;
    private String title;
    private String content;
    private LocalDateTime provideDate;
    private LocalDateTime createDate;

}
