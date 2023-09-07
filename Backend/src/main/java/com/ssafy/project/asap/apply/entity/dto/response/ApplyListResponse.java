package com.ssafy.project.asap.apply.entity.dto.response;

import com.ssafy.project.asap.apply.entity.domain.progress;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class ApplyListResponse {

    private Long applyId;
    private String title;
    private progress progress;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;

}
