package com.ssafy.project.asap.api.entity.dto.request;

import lombok.Builder;

@Builder
public class RegisterBlockApiRequest {

    private Long apiId;
    private Long memberId;

}
