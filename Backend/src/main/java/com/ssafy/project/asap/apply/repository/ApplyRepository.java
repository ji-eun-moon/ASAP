package com.ssafy.project.asap.apply.repository;

import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.member.entity.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplyRepository extends JpaRepository<Apply, Long> {

    Apply findByApplyId(long applyId);

    List<Apply> findByMember(Member member);

}
