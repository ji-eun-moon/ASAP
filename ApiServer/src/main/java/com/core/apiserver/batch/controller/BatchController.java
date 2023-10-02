package com.core.apiserver.batch.controller;

import com.core.apiserver.batch.service.BatchService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/v1/batch")
@RequiredArgsConstructor
@Tag(name = "Batch", description = "배치 테스트 api")
public class BatchController {

    private final BatchService batchService;

    @PostMapping("")
    public ResponseEntity<?> dataMake() {
        batchService.dataMake();
        return ResponseEntity.status(201).body("성공적");
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteRedis() {
        batchService.processRedisData();
        return ResponseEntity.status(204).body("성공적");
    }

    @PostMapping("/make-transaction")
    public ResponseEntity<?> toBlock() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
        batchService.processTransactionBlock();
        return ResponseEntity.status(201).body("성공적");
    }
}
