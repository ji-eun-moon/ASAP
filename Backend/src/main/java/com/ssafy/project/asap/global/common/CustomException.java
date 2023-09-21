package com.ssafy.project.asap.global.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CustomException extends RuntimeException{

    ErrorCode errorCode;

}
