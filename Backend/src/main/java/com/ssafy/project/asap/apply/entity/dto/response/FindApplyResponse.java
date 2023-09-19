package com.ssafy.project.asap.apply.entity.dto.response;

import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
public class FindApplyResponse {

    private Long applyId;
    private Long memberId;
    private String api;
    private String input;
    private String output;
    private Long price;
    private ApplyProgress progress;
    private String title;
    private String content;
    private LocalDateTime provideDate;
    private LocalDateTime createDate;

    public FindApplyResponse(Apply apply){
        this.applyId = apply.getApplyId();
        this.memberId = apply.getMember().getMemberId();
        this.api = apply.getApi();
        this.input = apply.getInput();
        this.output = apply.getOutput();
        this.price = apply.getPrice();
        this.progress = apply.getProgress();
        this.title = apply.getTitle();
        this.content = apply.getContent();
        this.provideDate = apply.getProvideDate();
        this.createDate = apply.getCreateDate();
    }

}
