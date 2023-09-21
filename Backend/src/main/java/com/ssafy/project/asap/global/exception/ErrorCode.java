package com.ssafy.project.asap.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode{

    USER_ID_DUPLICATED(HttpStatus.CONFLICT, "이미 등록된 아이디입니다.");

    private final HttpStatus httpStatus;
    private final String message;

}
