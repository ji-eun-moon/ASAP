package com.core.apiserver.api.controller;

import com.core.apiserver.api.service.ApiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/asap")
@Tag(name = "API", description = "API 관련 API")
public class ApiController {

    private final ApiService apiService;

    @GetMapping("/local/search/{wallet-id}")
    @Operation(summary = "로컬 지도", description = "query를 통해 로컬지도정보 입력받음")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "검색 결과"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<JSONObject> kakaoLocal(@RequestParam Map<String, String> param,
                                                 @PathVariable(value = "wallet-id") Long walletId,
                                                 @RequestHeader String Authorization) throws Exception {
        if (param.get("query").isEmpty()) {
            throw new IllegalArgumentException("query 값은 필수 입니다.");
        }
        System.out.println(Authorization);
//        System.out.println(httpServletRequest.getHeaders(HttpHeaders.AUTHORIZATION));
        return ResponseEntity.ok(apiService.kakaoLocal(param));
    }
}