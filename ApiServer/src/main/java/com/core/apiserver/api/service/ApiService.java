package com.core.apiserver.api.service;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.api.entity.dto.request.CreateApiRequest;
import com.core.apiserver.api.repository.ApiRepository;
import com.core.apiserver.total.repository.TotalRepository;
import com.core.apiserver.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.*;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ApiService {

    private final ApiRepository apiRepository;
    private final WalletRepository walletRepository;

    @Value("${private-key.kakao.rest-api}")
    public String kakaoRestKey;

    @Transactional
    public Api register(CreateApiRequest createApiRequest) {
        if (!walletRepository.existsById(createApiRequest.getWalletId())) {
            throw new IllegalArgumentException("맞는 지갑 주소가 없습니다.");
        }

        Api api = apiRepository.save(Api.builder()
                        .apiId(createApiRequest.getApiId())
                        .wallet(walletRepository.findById(createApiRequest.getWalletId()).orElseThrow())
                        .title(createApiRequest.getTitle())
                        .price(createApiRequest.getPrice())
                .build());

        return api;
    }


    public Long findProviderIdById(Long id) {
        return apiRepository.findById(id).orElseThrow().getWallet().getWalletId();
    }

    public JSONObject kakaoLocal(Map<String, String> param) throws Exception {
        String local = URLEncoder.encode(param.get("query"), "UTF-8");
        String analysis_type = "";
        String page = "";
        String size = "";

        if (param.containsKey("analysis_type")) {
            analysis_type = "&analysis_type=" + param.get("analysis_type");
        }

        if (param.containsKey("page")) {
            page = "&page=" + param.get("page");
        }

        if (param.containsKey("size")) {
            size = "&size=" + param.get("size");
        }


        String serviceUrl = "https://dapi.kakao.com/v2/local/search/address.json?&query=" + local + analysis_type + page + size;
        URL url = new URL(serviceUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("X-Requested-With", "curl");
        connection.setRequestProperty("Authorization", kakaoRestKey);

        if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
            throw new RuntimeException("Failed : HTTP error code : " + connection.getResponseCode());
        }
        BufferedReader bf = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
        String result = bf.readLine();
        JSONParser parser = new JSONParser();
        return (JSONObject) parser.parse(result);
    }

    public Object kakaoLocalKeyword(MultiValueMap<String, String> params) {

        URI uri = UriComponentsBuilder
                .fromUriString("https://dapi.kakao.com")
                .path("/v2/local/search/keyword")
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, kakaoRestKey); // 이 부분에서 헤더를 설정합니다.

            HttpEntity<?> httpEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);


            return responseEntity.getBody();

        } catch (Exception e) {
            log.info(e.getMessage());
            Map<String, String> map = new HashMap<>();
            map.put("status", e.getMessage());
            return map;
        }
    }
}
