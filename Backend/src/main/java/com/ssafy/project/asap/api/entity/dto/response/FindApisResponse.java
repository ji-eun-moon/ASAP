package com.ssafy.project.asap.api.entity.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class FindApisResponse {

    private Long apiId;
    private String title;
    private String content;
    private LocalDateTime createDate;

}
