package com.core.apiserver.transaction.entity.domain;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Transaction")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {


    @Id
    private String transactionId;
    private String transactionHash;

    private String userWalletAddress;
    private String providerWalletAddress;
    private String apiTitle;
    private List<Long> usageRecord;
    private String recordHash;


    public void updateRecord(List<Long> usageRecords) {
        this.usageRecord.addAll(usageRecords);
    }

    public void updateTransactionHash(String txHash, String hash) {
        this.transactionHash = txHash;
        this.recordHash = hash;
    }
}
