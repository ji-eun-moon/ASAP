package com.ssafy.project.asap.category.entity;

import jakarta.persistence.*;

@Entity
public class Category {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    private String tag;

}
