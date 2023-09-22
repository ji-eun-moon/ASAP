package com.core.apiserver.total.service;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.api.repository.ApiRepository;
import com.core.apiserver.total.entity.domain.Total;
import com.core.apiserver.total.entity.dto.request.FindTotalRequest;
import com.core.apiserver.total.entity.dto.request.TotalRequest;
import com.core.apiserver.total.repository.TotalRepository;
import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TotalService {

    private TotalRepository totalRepository;
    private WalletRepository walletRepository;
    private ApiRepository apiRepository;

    public boolean register(TotalRequest totalRequest) {
        try {
            Wallet userWallet = walletRepository.findById(totalRequest.getUserWalletId()).orElseThrow();
            Wallet providerWallet = walletRepository.findById(totalRequest.getProviderWalletId()).orElseThrow();
            Api api = apiRepository.findById(totalRequest.getApiId()).orElseThrow();

            Total total = Total.builder()
                    .userWallet(userWallet)
                    .providerWallet(providerWallet)
                    .api(api)
                    .useAmount(0L)
                    .build();

            totalRepository.save(total);

            return true;
        } catch (Exception e){
            return false;
        }
    }

    public boolean delete(FindTotalRequest totalRequest) {
        try {
            Wallet wallet = walletRepository.findById(totalRequest.getWalletId()).orElseThrow(() ->
                    new IllegalArgumentException("지갑 주소가 존재하지 않습니다"));
            Api api = apiRepository.findById(totalRequest.getApiId()).orElseThrow(() ->
                    new IllegalArgumentException("api가 존재하지 않습니다."));

            Total total = totalRepository.findByUserWalletAndApi(wallet, api).orElseThrow(() ->
                    new IllegalArgumentException("누계 정보가 없습니다."));

            totalRepository.delete(total);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
