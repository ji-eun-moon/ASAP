package com.ssafy.project.asap.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate redisTemplate;

    // 레디스 value 가져오기
    public String getValue(String key){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        return valueOperations.get(key);

    }

    // 레디스 key, value 저장
    public void setValue(String key, String value){

        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        long expireTime = 300L;

        valueOperations.set(key, value, expireTime, TimeUnit.SECONDS);

    }

}
