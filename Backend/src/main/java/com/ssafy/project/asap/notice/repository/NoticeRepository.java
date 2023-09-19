package com.ssafy.project.asap.notice.repository;

import com.ssafy.project.asap.notice.entity.domain.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {



}
