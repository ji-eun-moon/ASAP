package com.ssafy.project.asap.notice.entity.dto.response;

import com.ssafy.project.asap.notice.entity.domain.Notice;
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

    public FindNoticesResponse(Notice notice) {
        this.noticeId = notice.getNoticeId();
        this.title = notice.getTitle();
        this.content = notice.getContent();
        this.isRead = notice.isRead();
        this.createDate = notice.getCreateDate();
    }
}
