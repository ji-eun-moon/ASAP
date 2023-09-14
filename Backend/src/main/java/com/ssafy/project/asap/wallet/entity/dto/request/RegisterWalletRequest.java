package com.ssafy.project.asap.wallet.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterWalletRequest {

    private String address;
    private Float balance;
    private LocalDateTime createAt;
}
