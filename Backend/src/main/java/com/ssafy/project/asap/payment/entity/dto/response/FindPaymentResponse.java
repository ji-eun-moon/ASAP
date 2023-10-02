package com.ssafy.project.asap.payment.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindPaymentResponse {

    private String cardCompany = "삼성카드";
    private String cardNumber = "1234-5678-1234-5678";

    private LocalDateTime createAt = LocalDateTime.now();

    private Float fee = 177820F;
}
