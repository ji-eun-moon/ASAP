package com.ssafy.project.asap.purpose.entity.dto.request;

import com.ssafy.project.asap.purpose.entity.domain.PurposeIndustry;
import com.ssafy.project.asap.purpose.entity.domain.PurposeUnit;
import lombok.Getter;

@Getter
public class RegisterPurposeRequest {

    private Long apiId;
    private String purpose;
    private PurposeUnit unit;
    private PurposeIndustry industry;

}
