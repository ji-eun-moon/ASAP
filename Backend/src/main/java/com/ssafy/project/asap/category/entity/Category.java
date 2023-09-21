package com.ssafy.project.asap.category.entity;

import com.ssafy.project.asap.apitocategory.entity.domain.ApiToCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    @Column
    private String tag;

    @OneToMany(mappedBy = "category")
    List<ApiToCategory> apiToCategories = new ArrayList<>();

}
