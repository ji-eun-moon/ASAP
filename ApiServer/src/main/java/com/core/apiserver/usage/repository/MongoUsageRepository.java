package com.core.apiserver.usage.repository;

import com.core.apiserver.usage.entity.domain.MongoUsage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface MongoUsageRepository extends MongoRepository<MongoUsage, LocalDateTime> {
}
