package com.ssafy.project.asap.purpose.entity.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public class FindPurposesResponse {

    @JsonProperty("title")
    private String title;

}
