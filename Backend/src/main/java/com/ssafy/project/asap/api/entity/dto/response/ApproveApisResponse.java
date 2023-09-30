package com.ssafy.project.asap.api.entity.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public class ApproveApisResponse {

    @JsonProperty("title")
    private String title;

}
