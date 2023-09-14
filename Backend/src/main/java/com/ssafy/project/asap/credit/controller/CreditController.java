package com.ssafy.project.asap.credit.controller;

import com.ssafy.project.asap.credit.entity.dto.request.RegisterCreditRequest;
import com.ssafy.project.asap.credit.entity.dto.response.FindCreditResponse;
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
                    implementation = RegisterCreditRequest.class
            ))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> register(@RequestBody RegisterCreditRequest registerCreditRequest) {
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
    public ResponseEntity<FindCreditResponse> find() {
        return ResponseEntity.status(200).body(new FindCreditResponse());
    }

    @DeleteMapping("")
    @Operation(summary = "결제 수단 삭제", description = "결제 정보를 삭제한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "결제 수단 삭제"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> delete() {
        return ResponseEntity.status(204).body("결제 수단 삭제되었습니다.");
    }

    @PutMapping ("/update")
    @Operation(summary = "결제 수단 수정", description = "결제 정보를 수정한다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "202", description = "결제 수단 수정"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> update(@RequestBody RegisterCreditRequest registerCreditRequest) {
        return ResponseEntity.status(202).body("결제 수단 수정되었습니다.");
    }
}
