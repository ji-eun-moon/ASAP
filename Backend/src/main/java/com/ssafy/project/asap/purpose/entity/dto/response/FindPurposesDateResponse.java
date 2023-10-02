package com.ssafy.project.asap.purpose.entity.dto.response;

import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class FindPurposesDateResponse {

    private LocalDate date;
    private Long count;

}
