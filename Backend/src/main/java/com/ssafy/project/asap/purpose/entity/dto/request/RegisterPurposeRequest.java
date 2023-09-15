package com.ssafy.project.asap.purpose.entity.dto.request;

import lombok.Getter;

@Getter
public class RegisterPurposeRequest {

    private Long apiId;
    private String purpose;
    private String unit;
    private String industry;

}
