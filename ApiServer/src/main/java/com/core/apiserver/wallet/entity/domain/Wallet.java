package com.core.apiserver.wallet.entity.domain;


import com.core.apiserver.daily.entity.domain.Daily;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walletId;

    private String address;
    private String privateKey;

}
