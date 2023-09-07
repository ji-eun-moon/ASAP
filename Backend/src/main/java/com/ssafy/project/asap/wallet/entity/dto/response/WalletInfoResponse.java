package com.ssafy.project.asap.wallet.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WalletInfoResponse {

    private String address = "아람이의 지갑 주소";
    private Float balance = 100F;
    private LocalDateTime createAt = LocalDateTime.now();
}
