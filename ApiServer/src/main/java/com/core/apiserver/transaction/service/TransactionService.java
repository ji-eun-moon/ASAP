package com.core.apiserver.transaction.service;

import com.core.apiserver.global.increase.service.AutoIncreaseService;
import com.core.apiserver.global.util.Sha256Util;
import com.core.apiserver.transaction.entity.domain.Transaction;
import com.core.apiserver.transaction.entity.dto.request.TransactionRequest;
import com.core.apiserver.transaction.entity.dto.response.TransactionResponse;
import com.core.apiserver.transaction.repository.TransactionRepository;
import com.core.apiserver.wallet.service.UsageContractService;
import com.core.apiserver.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UsageContractService usageContractService;
    private final Sha256Util sha256Util;
    private final AutoIncreaseService autoIncreaseService;
    private final WalletService walletService;

    @Transactional
    public void register(TransactionRequest transactionRequest) {
        log.info(transactionRequest.getUserWalletAddress());
        log.info(transactionRequest.getProviderWalletAddress());
        log.info(transactionRequest.getApiTitle());
        log.info(transactionRequest.getStartDate().toString());
        log.info(transactionRequest.getEndDate().toString());

        Transaction transaction = Transaction.builder()
                ._id(autoIncreaseService.generateSequence(Transaction.TRANSACTION_SEQUENCE))
                .userWalletAddress(transactionRequest.getUserWalletAddress())
                .providerWalletAddress(transactionRequest.getProviderWalletAddress())
                .apiTitle(transactionRequest.getApiTitle())
                .startDate(transactionRequest.getStartDate())
                .usageRecord(new ArrayList<>())
                .endDate(transactionRequest.getEndDate())
                .build();
        Transaction saveTransaction = transactionRepository.save(transaction);
        log.info(transaction.toString());
        log.info(saveTransaction.toString());
    }

    @Transactional
    public void update(Long ids, List<String> usageRecords) {
        Transaction transaction = transactionRepository.findById(ids).orElseThrow();

        transaction.updateRecord(usageRecords);
        transactionRepository.save(transaction);
    }

    @Transactional
    public void delete() {
        transactionRepository.delete(transactionRepository.findById(2L).orElseThrow());
    }

    public TransactionResponse findTransaction(Map<String, String> params) {

        Transaction transaction = transactionRepository.findByUserWalletAddressAndApiTitleAndStartDateAndEndDate(
                params.get("userWalletAddress"), params.get("apiTitle"), LocalDate.parse(params.get("startDate")),
                LocalDate.parse(params.get("endDate")));

        return new TransactionResponse(transaction, transaction.toString());
    }

    @Transactional
    public void toBlock(Transaction transaction) throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {

        String txHash = usageContractService.setUsage(sha256Util.encryptToBytes(transaction.toString()));
        transaction.updateTransactionHash(txHash, sha256Util.encrypt(transaction.toString()));
        transactionRepository.save(transaction);
    }


//    @Transactional
//    public void toBlock(Transaction) throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
//
//
//
//
//        String txHash = usageContractService.setUsage(sha256Util.encryptToBytes(transaction.toString()));
//        jsonObject.put("트랜잭션", txHash);
//
//        transaction.updateTransactionHash(txHash, sha256Util.bytesToHex(shaConvert(jsonObject)));
//
//        transactionRepository.save(transaction);
//    }

    public String test() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {

        List<String> strings = new ArrayList<>();
        strings.add("2023-09-17T01:01:01.768");
        strings.add("2023-09-18T12:23:01.531");
        strings.add("2023-09-19T15:01:01.123");

        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("기간", LocalDate.now().minusDays(1) + "~" + LocalDate.now().minusDays(8));
        jsonObject.put("기간", "2023-09-17,2023-09-23");
        jsonObject.put("사용자 지갑", "0xf3a7315df842bb2ac45a8e026b344656d50d1cf4");
        jsonObject.put("제공자 지갑", "0x119b72a2ecc218c8998b6709f49ed2d7ee0fba1e");
        jsonObject.put("API 제목", "카카오 지도 API");
        jsonObject.put("사용량", strings);


        String txHash = usageContractService.setUsage(shaConvert(jsonObject));
        jsonObject.put("트랜잭션", "TransactionHash");

        return jsonObject.toJSONString();
    }

    public byte[] shaConvert(JSONObject jsonObject) throws NoSuchAlgorithmException {
        byte[] bytes = sha256Util.encryptToBytes(jsonObject.toJSONString());
        log.info(sha256Util.bytesToHex(bytes));
        return bytes;
    }
}
