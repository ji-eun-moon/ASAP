package com.ssafy.project.asap.apply.repository;

import com.ssafy.project.asap.apply.entity.domain.Apply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long> {

    Apply findByApplyId(long applyId);

}
