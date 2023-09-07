package com.ssafy.project.asap.apply.entity.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ApplySubmitRequest {

    private String title;
    private String content;
    private String input;
    private String output;
    private Long price;
    private String api;
    private List<String> tags;
    private LocalDateTime provideDate;

}
