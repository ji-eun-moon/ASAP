package com.ssafy.project.asap.wallet.controller;

import com.ssafy.project.asap.wallet.entity.dto.request.RegisterWalletRequest;
import com.ssafy.project.asap.wallet.entity.dto.response.FindWalletResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/wallet")
@RequiredArgsConstructor
@Tag(name="Wallet", description = "지갑 API")
public class WalletController {

    @PostMapping("")
    @Operation(summary = "지갑 생성", description = "새로운 지갑 생성, 잔고는 0으로 시작")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "지갑 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> register(@RequestBody RegisterWalletRequest registerWalletRequest) {

        return ResponseEntity.status(201).body("지갑 생성 완료");
    }

    @GetMapping("")
    @Operation(summary = "지갑 정보 조회", description = "지갑 잔고, 지갑정보 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "지갑 정보 조회"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<FindWalletResponse> findByWalletId() {

        return ResponseEntity.ok(new FindWalletResponse());
    }
}
