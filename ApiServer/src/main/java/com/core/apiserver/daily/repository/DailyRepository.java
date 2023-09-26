package com.core.apiserver.daily.repository;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.daily.entity.domain.Daily;
import com.core.apiserver.wallet.entity.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyRepository extends JpaRepository<Daily, Long> {

    Optional<Daily> findByUserWalletAndApiAndDate(Wallet UserWallet, Api api, LocalDate date);

    List<Daily> findAllByUserWalletAndApiAndDateBetween(Wallet userWallet, Api api, LocalDate startDate, LocalDate endDate);

    List<Daily> findAllByApiAndDateBetween(Api api, LocalDate startDate, LocalDate endDate);

}
