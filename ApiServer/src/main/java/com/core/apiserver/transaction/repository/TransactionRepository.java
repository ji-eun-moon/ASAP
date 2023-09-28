package com.core.apiserver.transaction.repository;

import com.core.apiserver.transaction.entity.domain.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, Long> {

    Transaction findByUserWalletAddressAndApiTitleAndStartDateAndEndDate(String userWalletAddress, String ApiTitle,
                                                                         LocalDate startDate, LocalDate endDate);
}
