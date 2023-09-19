package com.core.apiserver.usage.entity.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@RedisHash
@Builder
@Getter
public class RedisUsage {
    @Id
    private Integer id;

    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;
}
