package com.core.apiserver.daily.entity.domain;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.wallet.entity.domain.Wallet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DialectOverride;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Daily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dailyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_wallet")
    private Wallet userWallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_wallet")
    private Wallet providerWallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    @ColumnDefault("0L")
    private Long usage;

    @CreatedDate
    private LocalDate date;
}
