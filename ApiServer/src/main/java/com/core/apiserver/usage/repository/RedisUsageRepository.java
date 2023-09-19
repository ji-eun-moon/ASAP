package com.core.apiserver.usage.repository;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import org.springframework.data.repository.CrudRepository;

public interface RedisUsageRepository extends CrudRepository<RedisUsage, Integer> {

}
