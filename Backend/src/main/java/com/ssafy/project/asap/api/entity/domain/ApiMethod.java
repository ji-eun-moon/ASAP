package com.ssafy.project.asap.api.entity.domain;

import com.ssafy.project.asap.apply.entity.domain.ApplyMethod;

public enum ApiMethod {

    GET, POST, PUT, DELETE;

    public static ApiMethod mapApplyMethodToApiMethod(ApplyMethod applyMethod) {
        switch (applyMethod) {
            case GET:
                return ApiMethod.GET;
            case POST:
                return ApiMethod.POST;
            case PUT:
                return ApiMethod.PUT;
            case DELETE:
                return ApiMethod.DELETE;
            default:
                throw new IllegalArgumentException("Unsupported ApplyMethod: " + applyMethod);
        }
    }
}
