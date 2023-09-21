package com.ssafy.project.asap.purpose.repository;


import com.ssafy.project.asap.purpose.entity.domain.Purpose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PurposeRepository extends JpaRepository<Purpose, Long> {

    @Query("SELECT p " +
            "FROM Purpose p " +
            "WHERE p.api.apiId = :api and p.member.memberId = :memberId")
    Optional<Purpose> findByApiIdAndMemberId(@Param("api") Long api, @Param("memberId") Long memberId);

}
