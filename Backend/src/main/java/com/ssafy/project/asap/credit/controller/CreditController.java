package com.ssafy.project.asap.credit.controller;

import com.ssafy.project.asap.credit.entity.dto.request.CreateCreditRequest;
import com.ssafy.project.asap.credit.entity.dto.response.CreditResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/credit")
@RequiredArgsConstructor
@Tag(name="Credit", description = " 결제수단 API")
public class CreditController {

    @PostMapping("")
    @Operation(summary = "결제 수단 등록", description = "카드사, 카드 번호를 통해 결제 수단 등록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "결제 수단 등록", content = @Content(schema = @Schema(
                    implementation = CreateCreditRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> registerCredit(@RequestBody CreateCreditRequest createCreditRequest) {
        return ResponseEntity.status(201).body("결제 수단 등록 성공 ~ !");
    }

    @GetMapping("")
    @Operation(summary = "결제 수단 정보 조회", description = "결제 수단의 정보를 조회 할 수있다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "결제 수단 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<CreditResponse> getCredit() {
        return ResponseEntity.status(200).body(new CreditResponse());
    }

    @DeleteMapping("")
    @Operation(summary = "결제 수단 삭제", description = "결제 정보를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "결제 수단 삭제"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> deleteCredit() {
        return ResponseEntity.status(204).body("결제 수단 삭제되었습니다.");
    }

    @PostMapping("/update")
    @Operation(summary = "결제 수단 수정", description = "결제 정보를 수정한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "결제 수단 수정"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> updateCredit(@RequestBody CreateCreditRequest createCreditRequest) {
        return ResponseEntity.status(202).body("결제 수단 수정되었습니다.");
    }
}
