package com.ssafy.project.asap.member.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FindIdRequest {

    private String email;
    private String name;
}
