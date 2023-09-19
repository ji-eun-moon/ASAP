package com.ssafy.project.asap.category.service;

import com.ssafy.project.asap.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public void register(List<String> list){

    }

}
