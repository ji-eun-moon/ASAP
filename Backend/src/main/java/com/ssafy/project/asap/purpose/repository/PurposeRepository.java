package com.ssafy.project.asap.purpose.repository;


import com.ssafy.project.asap.purpose.entity.domain.Purpose;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurposeRepository extends JpaRepository<Purpose, Long> {
}
