package com.ssafy.project.asap.api.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryIdsRequest {
    private List<Long> ids;
    private Integer year;
    private Integer month;
}
