package com.core.apiserver.transaction.entity.domain;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.wallet.entity.domain.Wallet;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "Transaction")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    private String transactionHash;

    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;
    private List<Long> usageRecode;
    private String hash;
}
