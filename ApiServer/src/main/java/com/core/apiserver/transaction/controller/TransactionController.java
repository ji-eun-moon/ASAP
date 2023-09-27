package com.core.apiserver.transaction.controller;

import com.core.apiserver.daily.repository.DailyRepository;
import com.core.apiserver.transaction.entity.dto.request.RecordsRequest;
import com.core.apiserver.transaction.entity.dto.request.TransactionRequest;
import com.core.apiserver.transaction.repository.TransactionRepository;
import com.core.apiserver.transaction.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final DailyRepository dailyRepository;
    private final TransactionRepository transactionRepository;

//    @GetMapping("")
//    public ResponseEntity<String > test() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
//        return ResponseEntity.ok(transactionService.test());
//    }

    @PostMapping ("")
    public ResponseEntity<String> register(@RequestBody TransactionRequest transactionRequest)  {
        transactionService.register(transactionRequest);
        return ResponseEntity.ok("저장 완료");
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(transactionRepository.findAll());
    }

    @GetMapping("{api-id}")
    @Operation(summary = "트랜잭션 조회", description = "시작일과 종료일을 통해 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "API 생성"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Not Found"),
            @ApiResponse(responseCode = "500", description = "Server Error")
    })
    public ResponseEntity<?> get(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(transactionRepository.findById(6L).get().toString());
    }

    @PutMapping ("")
    public ResponseEntity<?> updateRecord(@RequestBody RecordsRequest request)  {
        transactionService.update(6L, request.getRecords());
        return ResponseEntity.ok("저장 완료");
    }

    @DeleteMapping ("")
    public ResponseEntity<?> deleteAll()  {
        transactionService.delete();
        return ResponseEntity.ok("삭제 완료");
    }

    @PostMapping ("/block")
    public ResponseEntity<String> toBlock() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
        transactionService.toBlock(transactionRepository.findById(6L).orElseThrow());
        return ResponseEntity.ok(transactionRepository.findById(6L).get().toString());
    }

}