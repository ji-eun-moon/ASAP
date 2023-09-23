package com.core.apiserver.transaction.service;

import com.core.apiserver.transaction.repository.TransactionRepository;
import com.core.apiserver.usage.entity.domain.MongoUsage;
import com.core.apiserver.usage.repository.MongoUsageRepository;
import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final MongoUsageRepository mongoUsageRepository;
    private final WalletRepository walletRepository;

    @Transactional
    public void register(Long userWalletId, Long providerWalletId, Long apiId) {
        Wallet userWallet = walletRepository.findById(userWalletId).orElseThrow();
        Wallet providerWallet = walletRepository.findById(providerWalletId).orElseThrow();

        List<MongoUsage> mongoUsages = mongoUsageRepository.findAllByUserWalletIdAndApiId(userWalletId, apiId);

//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("period", LocalDate.now().minusDays(1) + "~" + LocalDate.now().minusDays(8));


    }

//    public JSONObject test() {
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("period", LocalDate.now().minusDays(1) + "~" + LocalDate.now().minusDays(8));
//        jsonObject.put("userWallet", )
//    }
}
