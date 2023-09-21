package com.ssafy.project.asap.apitocategory.entity.domain;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.category.entity.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ApiToCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long apiToCategoryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

}
