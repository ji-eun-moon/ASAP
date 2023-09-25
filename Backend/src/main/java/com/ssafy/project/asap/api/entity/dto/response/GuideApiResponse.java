package com.ssafy.project.asap.api.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class GuideApiResponse {

    private String title;
    private String api;
    private String input;
    private String inputExample;
    private String output;
    private String outputExample;

}
