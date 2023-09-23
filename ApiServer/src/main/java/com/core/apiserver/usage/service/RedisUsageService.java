package com.core.apiserver.usage.service;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import com.core.apiserver.usage.entity.dto.request.CreateMongoUsageRequest;
import com.core.apiserver.usage.entity.dto.request.CreateRedisUsageRequest;
import com.core.apiserver.usage.repository.RedisUsageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedisUsageService {

    private final RedisUsageRepository usageRepository;
    private final MongoUsageService mongoUsageService;

    @Transactional
    public RedisUsage save(CreateRedisUsageRequest createRedisUsageRequest) {
        return usageRepository.save(createRedisUsageRequest.toRedisUsage());
    }

    @Transactional
    public void delete() {
        Iterable<RedisUsage> redisUsages = usageRepository.findAll();
        for (RedisUsage redisUsage: redisUsages) {
            log.info(String.valueOf(redisUsage.getId()));
            mongoUsageService.save(new CreateMongoUsageRequest(redisUsage));
        }
        usageRepository.deleteAll();
    }
}
