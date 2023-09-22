package com.core.apiserver.api.entity.domain;

import com.core.apiserver.daily.entity.domain.Daily;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Api {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "api_id")
    private Long apiId;

    private String address;
    private Integer price;

    @OneToMany(mappedBy = "api")
    private List<Daily> dailies = new ArrayList<>();
}
