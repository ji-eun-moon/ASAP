package com.ssafy.project.asap.errors.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorsResponse {

    private String errorName;
    private Integer errorCount;
}
