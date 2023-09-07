package com.ssafy.project.asap.credit.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreditResponse {
    private String cardCompany = "국민은행";
    private String cardNumber = "1234-5678-1234-5678";
}
