package com.asapbatch.batch.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Slf4j
@Service
public class BatchService {

    @Value("${server.allow-header}")
    private String allowHeader;

    @Scheduled(fixedRate = 1000 * 60 * 10)
    public void processRedis() {
        serverGetConnect("/api/v1/batch/redis-process");
    }

    @Scheduled(cron = "0 0 1 * * 0")
    public void processTransaction() {
        serverGetConnect("/api/v1/batch/transaction-process");
    }

    @Scheduled(cron = "0 0 1 1 * ?")
    public void processCredit() {
        serverGetConnect("/api/v1/batch/credit-process");
    }

    public void serverGetConnect(String path) {

        URI uri = UriComponentsBuilder
//                .fromUriString("http://localhost:9001")
                .fromUriString("https://j9c202.p.ssafy.io/block")
                .path(path)
                .encode()
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, allowHeader);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> httpEntity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, String.class);
        log.info((String) responseEntity.getBody());

    }
}
