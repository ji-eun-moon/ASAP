package com.core.apiserver.api.service;

import com.core.apiserver.api.repository.ApiRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ApiService {

    private final ApiRepository apiRepository;

    @Value("${private-key.kakao.rest-api}")
    public String kakaoRestKey;

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
}
