package com.core.apiserver.wallet.controller;

import com.core.apiserver.global.util.Sha256Util;
import com.core.apiserver.wallet.service.BasicService;
import com.core.apiserver.wallet.service.UsageContractService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/wallet")
@Tag(name="Wallet", description = "지갑 관련 API")
public class WalletController {

    private final UsageContractService usageContractService;
    private final Sha256Util sha256Util;

    @GetMapping("/test")
    @Operation(summary = "test", description = "스마트 컨트랙트 test")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스마트 컨트랙트 연동"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<String> test() throws IOException, ExecutionException, InterruptedException {
        return ResponseEntity.ok(usageContractService.getUsage());
    }

    @GetMapping("/test2")
    @Operation(summary = "test2", description = "스마트 컨트랙트 test")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스마트 컨트랙트 연동"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> test2() throws IOException, ExecutionException, InterruptedException, NoSuchAlgorithmException {
        usageContractService.setUsage(sha256Util.encryptToBytes("송아람"));
        return ResponseEntity.ok("성공적");
    }
}
