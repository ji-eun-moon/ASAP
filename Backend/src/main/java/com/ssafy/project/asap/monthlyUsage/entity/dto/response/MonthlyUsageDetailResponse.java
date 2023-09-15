package com.ssafy.project.asap.monthlyUsage.entity.dto.response;

import com.ssafy.project.asap.errors.entity.dto.response.ErrorsResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyUsageDetailResponse {

    private MonthlyUsageResponse monthlyUsageResponse;
    private Integer newMember;
    private List<ErrorsResponse> errors;
}
