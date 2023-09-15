package com.ssafy.project.asap.monthlyUsage.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyUsageResponse {

    private String apiInfo;
    private Integer usage;
    private Integer price;
}
