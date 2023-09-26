package com.ssafy.project.asap.api.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MonthlyRequest {
    private Integer year;
    private Integer month;
}
