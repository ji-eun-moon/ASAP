package com.core.apiserver.daily.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DailyUsageResponse {

    private LocalDate date;
    private Long amount;
    private Long price;
}
