package com.ssafy.project.asap.api.entity.domain;

import com.ssafy.project.asap.global.common.BaseTime;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.purpose.entity.domain.Purpose;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Api extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long apiId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String api;

    @Column(nullable = false)
    private String input;

    @Column(nullable = false)
    private String output;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDate provideDate;

    @Column
    private ApiMethod apiMethod;

    @OneToMany(mappedBy = "api", cascade = CascadeType.ALL)
    List<Purpose> purposeList = new ArrayList<>();
}
