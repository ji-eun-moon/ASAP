package com.ssafy.project.asap.purpose.entity.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class FindPurposesDateResponse {

    private LocalDate registerDate;
    private Long number;

}
