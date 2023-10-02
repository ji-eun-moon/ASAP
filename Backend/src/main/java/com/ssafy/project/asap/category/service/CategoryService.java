package com.ssafy.project.asap.category.service;

import com.ssafy.project.asap.category.entity.domain.Category;
import com.ssafy.project.asap.category.entity.dto.response.CategoryListResponse;
import com.ssafy.project.asap.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
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

        log.info(list.toString());

        return list;

    }

    public List<CategoryListResponse> categoryList(){

        List<Category> list = categoryRepository.findAll();

        List<CategoryListResponse> categoryListResponseList = list.stream()
                .map(category -> CategoryListResponse
                        .builder()
                        .category(category.getCategory())
                        .count((long) category.getApiList().size())
                        .build())
                .collect(Collectors.toList());

        return categoryListResponseList;
    }

}
