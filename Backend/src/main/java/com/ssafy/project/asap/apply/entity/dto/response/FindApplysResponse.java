package com.ssafy.project.asap.apply.entity.dto.response;

import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class FindApplysResponse {

    private Long applyId;
    private String title;
    private ApplyProgress progress;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;

}
