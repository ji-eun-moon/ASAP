package com.core.apiserver.usage.service;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import com.core.apiserver.usage.entity.dto.request.CreateRedisUsageRequest;
import com.core.apiserver.usage.repository.RedisUsageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedisUsageService {

    private final RedisUsageRepository usageRepository;

    @Transactional
    public RedisUsage save(CreateRedisUsageRequest createRedisUsageRequest) {
        return usageRepository.save(createRedisUsageRequest.toRedisUsage());
    }
}
