package com.ssafy.project.asap.notice.entity.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class NoticeListResponse {

    private Long noticeId;
    private String title;
    private String content;
    private boolean isRead;
    private LocalDateTime createDate;

}
