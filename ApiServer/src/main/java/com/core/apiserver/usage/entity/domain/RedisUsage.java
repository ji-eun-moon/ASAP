package com.core.apiserver.usage.entity.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.time.LocalDateTime;

@RedisHash
@Builder
@Getter
public class RedisUsage {
    @Id
    private Integer id;

    private Integer userWalletId;
    private Integer providerWalletId;
    private Integer apiId;
    private LocalDateTime useAt;
}
