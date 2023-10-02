package com.ssafy.project.asap.api.entity.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class FindApisResponse {

    private Long apiId;
    private String title;
    private String content;
    private LocalDateTime createDate;

}
