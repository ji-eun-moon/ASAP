package com.core.apiserver.usage.entity.dto.request;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRedisUsageRequest {

    private Integer userWalletId;
    private Integer providerWalletId;
    private Integer apiId;

    public RedisUsage toRedisUsage() {
        return RedisUsage.builder()
                .userWalletId(userWalletId)
                .providerWalletId(providerWalletId)
                .apiId(apiId)
                .useAt(LocalDateTime.now())
                .build();
    }
}
