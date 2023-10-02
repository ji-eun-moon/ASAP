package com.ssafy.project.asap.purpose.repository;


import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.purpose.entity.domain.Purpose;
import com.ssafy.project.asap.purpose.entity.dto.response.FindPurposesDateResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PurposeRepository extends JpaRepository<Purpose, Long> {

    @Query("SELECT p " +
            "FROM Purpose p " +
            "WHERE p.api.apiId = :api and p.member.memberId = :memberId")
    Optional<Purpose> findByApiIdAndMemberId(@Param("api") Long api, @Param("memberId") Long memberId);

    @Query("SELECT p " +
            "FROM Purpose p " +
            "WHERE p.api.apiId = :apiId and p.member.id = :id")
    Optional<Purpose> findByApiAndMember(@Param("apiId") Long apiId, @Param("id") String id);

    List<Purpose> findAllByMember(Member member);

    @Query("SELECT p " +
            "FROM Purpose p " +
            "WHERE p.api.apiId = :apiId and p.member.memberId = :memberId")
    Optional<Purpose> findByApiAndMember(@Param("apiId") Long apiId,@Param("memberId") Long memberId);

    @Query("SELECT DATE(p.createDate) AS date, COUNT(p) as count " +
            "FROM Purpose p " +
            "WHERE p.api.apiId = :apiId AND p.createDate > :date " +
            "GROUP BY DATE(p.createDate)")
    List<Object[]> findAllByApiAndCreateDate(@Param("apiId") Long apiId, @Param("date") LocalDateTime date);

}
