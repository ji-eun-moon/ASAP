package com.ssafy.project.asap.payment.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterPaymentRequest {

    private String cardCompany;
    private String cardNumber;
    private LocalDateTime createAt;
    private Float fee;
}
