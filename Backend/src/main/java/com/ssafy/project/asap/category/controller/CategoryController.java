package com.ssafy.project.asap.category.controller;

import com.ssafy.project.asap.category.entity.Category;
import com.ssafy.project.asap.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/list")
    public ResponseEntity<List<Category>> findAll(){

        return ResponseEntity.ok(categoryService.findAll());

    }

}
