package com.core.apiserver.usage.entity.dto.response;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RedisUsageResponse {

    private Integer id;
    private Integer userWalletId;
    private Integer providerWalletId;
    private Integer apiId;
    private LocalDateTime useAt;

    public RedisUsageResponse(RedisUsage redisUsage) {
        this.id = redisUsage.getId();
        this.userWalletId = redisUsage.getUserWalletId();
        this.apiId = redisUsage.getApiId();
        this.providerWalletId = redisUsage.getProviderWalletId();
        this.useAt = redisUsage.getUseAt();
    }
}
