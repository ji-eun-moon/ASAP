package com.core.apiserver.wallet.service;

import com.core.apiserver.global.util.Sha256Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.PersonalUnlockAccount;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.*;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Component
public class EthereumService {
    @Autowired
    private Sha256Util sha256Util;

    private String from = "0xb2f25bea384704fc26d60f1bf7490444df21babe";
    private String contract = "0x60b0f09e73cc508bd2553179dc445586cfb3ca3e";

    // hardcording because of testing
    private String pwd = "pass";

    private Admin web3j = null;

    public EthereumService() {
        web3j = Admin.build(new HttpService("https://j9c202.p.ssafy.io/lego/"));
    }

    public Object ethCall(Function function) throws IOException {
        // 1. Account Lock 해제
        PersonalUnlockAccount personalUnlockAccount = web3j.personalUnlockAccount(from, pwd).send();

        if (personalUnlockAccount.accountUnlocked()) {
            // 2. transaction 제작
            Transaction transaction = Transaction.createEthCallTransaction(from, contract, FunctionEncoder.encode(function));

            // 3. ethereum 호출후 결과 가져오기
            EthCall ethCall = web3j.ethCall(transaction, DefaultBlockParameterName.LATEST).send();

            // 4. 결과값 decode
            List<Type> decode = FunctionReturnDecoder.decode(ethCall.getResult(), function.getOutputParameters());
            if (decode.isEmpty()) {
                throw new RuntimeException();
            }
            byte[] s = (byte[]) decode.get(0).getValue();

            String s1 = sha256Util.bytesToHex(s);

            System.out.println("ethCall.getResult() = " + ethCall.getResult());
            System.out.println("getValue = " + s1);
            System.out.println("getType = " + decode.get(0).getTypeAsString());

            return decode.get(0).getValue();
        } else {
            throw new PersonalLockException("check ethereum personal Lock");
        }
    }

    public String ethSendTransaction(Function function) throws IOException, InterruptedException, ExecutionException {

        // 1. Account Lock 해제
        PersonalUnlockAccount personalUnlockAccount = web3j.personalUnlockAccount(from, pwd).send();

        if (personalUnlockAccount.accountUnlocked()) {

            // 2. account에 대한 nonce값 가져오기
            EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(
                    from, DefaultBlockParameterName.LATEST).sendAsync().get();

            BigInteger nonce = ethGetTransactionCount.getTransactionCount();


            // 3. Transaction 값 제작
            Transaction transaction = Transaction.createFunctionCallTransaction(from, nonce, Transaction.DEFAULT_GAS, null,
                    contract, FunctionEncoder.encode(function));

            // 4. ethereum Call &
            EthSendTransaction ethSendTransaction = web3j.ethSendTransaction(transaction).send();


            // transaction에 대한 transaction Hash값 얻기.
            String transactionHash = ethSendTransaction.getTransactionHash();



            // ledger 에 쓰여지기까지 기다리기
            Thread.sleep(5000);

            return transactionHash;
        } else {
            throw new PersonalLockException("check ethereum personal Lock");
        }
    }

    public TransactionReceipt getReceipt(String transactionHash) throws IOException {
        EthGetTransactionReceipt transactionReceipt = web3j.ethGetTransactionReceipt(transactionHash).send();

        if(transactionReceipt.getTransactionReceipt().isPresent())
        {
            System.out.println("transactionReceipt.getResult().getContractAddress() = " +
                    transactionReceipt.getResult());

            EthTransaction transaction = web3j.ethGetTransactionByHash(transactionHash).send();
            System.out.println(transaction.getTransaction().get().getInput());
            byte[] s = transaction.getTransaction().get().getInput().getBytes();
            String s1 = sha256Util.bytesToHex(s);
            System.out.println(s1);
        }
        else
        {
            System.out.println("transaction complete not yet");
        }

        return transactionReceipt.getResult();
    }


    private static class PersonalLockException extends RuntimeException
    {
        public PersonalLockException(String msg)
        {
            super(msg);
        }
    }
}
