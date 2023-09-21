package com.ssafy.project.asap.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode{

    USER_ID_DUPLICATED(HttpStatus.CONFLICT, "이미 등록된 아이디입니다."),
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "등록되지않은 카테고리입니다."),
    USER_ID_NOT_FOUND(HttpStatus.NOT_FOUND, "잘못된 아이디입니다."),
    NOT_REGISTERED_API(HttpStatus.NOT_FOUND, "등록되지않은 API입니다."),
    USER_NOT_HAVE_WALLET(HttpStatus.NOT_FOUND, "지갑이 등록되지 않은 회원입니다.");

    private final HttpStatus httpStatus;
    private final String message;

}
