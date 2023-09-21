package com.ssafy.project.asap.category.service;

import com.ssafy.project.asap.category.entity.Category;
import com.ssafy.project.asap.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public void registerIfAbsent(List<String> list){

        for(String category : list){
            if(categoryRepository.findByCategory(category).isEmpty()){
                categoryRepository.save(Category.builder()
                                .category(category)
                            .build());
            }
        }

    }

    public List<String> findAll(){

        List<String> list = new ArrayList<>();

        for(Category category : categoryRepository.findAll()){
            list.add(category.getCategory());
        }

        return list;

    }

}
