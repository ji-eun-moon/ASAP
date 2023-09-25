package com.core.apiserver.transaction.service;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.daily.entity.domain.Daily;
import com.core.apiserver.global.util.Sha256Util;
import com.core.apiserver.transaction.entity.domain.Transaction;
import com.core.apiserver.transaction.repository.TransactionRepository;
import com.core.apiserver.usage.entity.domain.MongoUsage;
import com.core.apiserver.usage.repository.MongoUsageRepository;
import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.service.UsageContractService;
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
import java.util.concurrent.ExecutionException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final MongoUsageRepository mongoUsageRepository;
    private final UsageContractService usageContractService;
    private final Sha256Util sha256Util;

    @Transactional
    public void register(Daily daily) throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
        Wallet userWallet = daily.getUserWallet();
        Wallet providerWallet = daily.getProviderWallet();

        Api api = daily.getApi();

        List<MongoUsage> mongoUsages = mongoUsageRepository.findAllByUserWalletIdAndApiId(userWallet.getWalletId(),
                providerWallet.getWalletId());
        List<Long> record = new ArrayList<>();
        for (MongoUsage mongoUsage : mongoUsages){
            record.add(mongoUsage.getUseAt());
            mongoUsageRepository.delete(mongoUsage);
        }


//        Transaction transaction = Transaction.builder()
//                .transactionHash(txHash)
//                .userWalletAddress(userWallet.getAddress())
//                .providerWalletAddress(providerWallet.getAddress())
//                .hash(sha256Util.bytesToHex(shaConvert(jsonObject)))
//                .usageRecode(record)
//                .apiTitle(api.getTitle())
//                .build();

//        transactionRepository.save(transaction);
    }

    @Transactional
    public void update(String s, List<Long> usageRecords) {
        Transaction transaction = transactionRepository.findById(s).orElseThrow();

        transaction.updateRecord(usageRecords);
        transactionRepository.save(transaction);
    }
    @Transactional
    public void toBlock(Transaction transaction) throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {


        JSONObject jsonObject = new JSONObject();
        jsonObject.put("기간", LocalDate.now().minusDays(1) + "~" + LocalDate.now().minusDays(8));
        jsonObject.put("사용자 지갑 주소", transaction.getUserWalletAddress());
        jsonObject.put("API 이름", transaction.getApiTitle());
        jsonObject.put("제공자 지갑 주소", transaction.getProviderWalletAddress());
        jsonObject.put("기록", transaction.getUsageRecord());

        String txHash = usageContractService.setUsage(shaConvert(jsonObject));
        jsonObject.put("트랜잭션", txHash);

        transaction.updateTransactionHash(txHash, sha256Util.bytesToHex(shaConvert(jsonObject)));

        transactionRepository.save(transaction);
    }

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
