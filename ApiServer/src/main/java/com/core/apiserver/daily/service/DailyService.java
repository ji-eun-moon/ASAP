package com.core.apiserver.daily.service;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.api.entity.dto.response.ApiResponse;
import com.core.apiserver.api.repository.ApiRepository;
import com.core.apiserver.daily.entity.domain.Daily;
import com.core.apiserver.daily.entity.dto.request.DailyUsageRequest;
import com.core.apiserver.daily.entity.dto.request.GetDailyRequest;
import com.core.apiserver.daily.entity.dto.request.MonthlyUsageRequest;
import com.core.apiserver.daily.entity.dto.response.UsageResponse;
import com.core.apiserver.daily.repository.DailyRepository;
import com.core.apiserver.total.entity.domain.Total;
import com.core.apiserver.total.repository.TotalRepository;
import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DailyService {
    private final DailyRepository dailyRepository;
    private final ApiRepository apiRepository;
    private final TotalRepository totalRepository;
    private final WalletRepository walletRepository;

    @Transactional
    public void register(DailyUsageRequest dailyUsageRequest) {

        Api api = apiRepository.findById(dailyUsageRequest.getApiId()).orElseThrow();
        Wallet userWallet = walletRepository.findById(dailyUsageRequest.getUserWalletId()).orElseThrow();

        dailyRepository.save(Daily.builder()
                        .userWallet(userWallet)
                        .providerWallet(api.getWallet())
                        .api(api)
                        .useAmount(dailyUsageRequest.getAmount())
                        .date(dailyUsageRequest.getDate())
                .build());
    }

    @Transactional
    public void update(DailyUsageRequest dailyUsageRequest) {

        Api api = apiRepository.findById(dailyUsageRequest.getApiId()).orElseThrow();
        Wallet userWallet = walletRepository.findById(dailyUsageRequest.getUserWalletId()).orElseThrow();

        Daily daily = dailyRepository.findByUserWalletAndApiAndDate(userWallet, api, dailyUsageRequest.getDate()).orElseThrow();
        daily.updateAmount(dailyUsageRequest.getAmount());
        dailyRepository.save(daily);
    }

    public List<UsageResponse> monthlyUsage(MonthlyUsageRequest monthlyUsageRequest) {

        List<Total> totals = totalRepository.findAllByUserWallet(walletRepository.findById(monthlyUsageRequest.getUserWalletId()).orElseThrow());

        List<UsageResponse> usageResponses = new ArrayList<>();
        for (Total total: totals) {
            YearMonth yearMonth = YearMonth.of(monthlyUsageRequest.getYear(), monthlyUsageRequest.getMonth());
            List<Daily> dailies = dailyRepository.findAllByUserWalletAndApiAndDateBetween(total.getUserWallet(),
                    total.getApi(),
                    yearMonth.atDay(1), yearMonth.atEndOfMonth());

            Long amount = 0L;

            for (Daily d : dailies) {
                amount += d.getUseAmount();
            }
            Long price = amount * total.getApi().getPrice();
            if (amount == 0) {
                continue;
            }

            usageResponses.add(new UsageResponse(new ApiResponse(total.getApi()), amount, price));
        }

        return usageResponses;
    }

    public List<UsageResponse> dailyUsage(GetDailyRequest getDailyRequest) {

        List<Total> totals = totalRepository.findAllByUserWallet(walletRepository.findById(getDailyRequest.getUserWalletId()).orElseThrow());

        List<UsageResponse> usageResponses = new ArrayList<>();
        for (Total total : totals) {
            Optional<Daily> daily = dailyRepository.findByUserWalletAndApiAndDate(total.getUserWallet(),
                    total.getApi(), getDailyRequest.getDate());

            if (daily.isEmpty()) {
                continue;
            }

            Long amount = daily.get().getUseAmount();
            Long price = amount * total.getApi().getPrice();

            usageResponses.add(new UsageResponse(new ApiResponse(total.getApi()), amount, price));
        }

        return usageResponses;
    }
}
