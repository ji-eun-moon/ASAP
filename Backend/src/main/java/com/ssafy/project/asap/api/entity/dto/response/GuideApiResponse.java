package com.ssafy.project.asap.api.entity.dto.response;

import com.ssafy.project.asap.api.entity.domain.ApiCategory;
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
    private String content;
    private ApiCategory category;
    private String input;
    private String output;

}
