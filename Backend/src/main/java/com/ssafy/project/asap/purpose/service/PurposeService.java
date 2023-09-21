package com.ssafy.project.asap.purpose.service;

import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.repository.MemberRepository;
import com.ssafy.project.asap.purpose.repository.PurposeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PurposeService {

    private final PurposeRepository purposeRepository;
    private final MemberRepository memberRepository;

    public void checkApply(Long apiId, String id) {

        purposeRepository.findByApiIdAndMemberId(apiId, memberRepository.findById(id).get().getMemberId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_REGISTERED_API));

    }
}
