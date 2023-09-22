package com.core.apiserver.transaction.entity.domain;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.wallet.entity.domain.Wallet;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "wallet_id", name = "userWalletId", nullable = false)
    private Wallet userWallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "wallet_id", name = "providerWalletId", nullable = false)
    private Wallet providerWallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    private String transactionHash;

    private LocalDate startDate;
    private LocalDate endDate;

}
