package com.ssafy.project.asap.monthlyUsage.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyUsageResponse {

    private String apiInfo;
    private Integer usage;
    private Integer price;
    private LocalDate date;
}

