package com.core.apiserver.daily.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProvidingResponse {
    private Long apiId;
    private String apiTitle;
    private Long amount;
    private Long price;
}
