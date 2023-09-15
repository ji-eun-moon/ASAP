package com.ssafy.project.asap.monthlyUsage.entity.dto.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TotalMonthlyUsageResponse {

    private Integer totalPrice;
    private List<MonthlyUsageResponse> monthlyUsageControllers;
}
