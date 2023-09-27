package com.core.apiserver.wallet.service;

import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.entity.dto.CreateWalletRequest;
import com.core.apiserver.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import okhttp3.Credentials;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WalletService {

    private final WalletRepository walletRepository;
    private final Web3j web3j = Web3j.build(new HttpService());

    @Transactional
    public Long register(CreateWalletRequest createWalletRequest) {
        Wallet wallet = walletRepository.save(createWalletRequest.toWallet());
        return wallet.getWalletId();
    }

    public String findPwdByAddress(String address) {
        return walletRepository.findByAddress(address).getPrivateKey();
    }



}
