package com.core.apiserver.api.entity.dto.request;

import com.core.apiserver.api.entity.domain.AnalyzeType;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoRequest {
    @NotEmpty(message = "필수 입력값입니다.")
    private String query;

    @Nullable
    private AnalyzeType analyzeType;
    @Nullable
    private Integer page;
    @Nullable
    private Integer size;
}
