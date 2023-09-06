package com.ssafy.project.asap.api.entity.dto.request;

import lombok.Builder;

@Builder
public class ApiUseRequest {

    private Long memberId;
    private Long apiId;
    private String purpose;
    private ApiCategoryRequest category;

}
