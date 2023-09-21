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
    USER_NOT_HAVE_WALLET(HttpStatus.NOT_FOUND, "지갑이 등록되지 않은 회원입니다."),
    PASSWORD_NOT_AUTHORIZED(HttpStatus.NON_AUTHORITATIVE_INFORMATION, "올바르지 않은 패스워드입니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 회원이 존재하지 않습니다."),
    SIGNUP_DUPLICATED(HttpStatus.CONFLICT, "회원가잆 오류입니다."),
    EMAIL_CODE_NOT_AUTHORIZED(HttpStatus.NON_AUTHORITATIVE_INFORMATION, "올바른 인증번호가 아닙니다."),
    EMAIL_NOT_SEND(HttpStatus.BAD_REQUEST, "인증코드 전송에 실패했습니다.");

    private final HttpStatus httpStatus;
    private final String message;

}
