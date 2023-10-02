package com.ssafy.project.asap.member.entity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindMemberResponse {

    private String walletInfo = "지갑 정보";
    private Float balance = 1234567890F;
    private String name = "찬웅";
    private String email = "asapfighting@naver.com";
}
