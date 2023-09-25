package com.core.apiserver.transaction.controller;

import com.core.apiserver.daily.repository.DailyRepository;
import com.core.apiserver.transaction.service.TransactionService;
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
@RequestMapping("/api/v1/test/1234")
public class TransactionController {

    private final TransactionService transactionService;
    private final DailyRepository dailyRepository;

    @GetMapping("")
    public ResponseEntity<String > test() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
        return ResponseEntity.ok(transactionService.test());
    }
}
