package com.ssafy.project.asap.notice.entity.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class FindNoticesResponse {

    private Long noticeId;
    private String title;
    private String content;
    private boolean isRead;
    private LocalDateTime createDate;

}
