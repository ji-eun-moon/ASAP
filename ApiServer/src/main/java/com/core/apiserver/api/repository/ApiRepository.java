package com.core.apiserver.api.repository;

import com.core.apiserver.api.entity.domain.Api;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApiRepository extends JpaRepository<Api, Long> {
}
