package com.ssafy.project.asap.api.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindApiResponse {

    private Long apiId;
    private String memberName;
    private String output;
    private String title;
    private String content;
    private String tags;

}
