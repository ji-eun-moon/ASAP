package com.ssafy.project.asap.purpose.service;

import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.repository.MemberRepository;
import com.ssafy.project.asap.purpose.entity.domain.Purpose;
import com.ssafy.project.asap.purpose.entity.dto.request.RegisterPurposeRequest;
import com.ssafy.project.asap.purpose.repository.PurposeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PurposeService {

    private final PurposeRepository purposeRepository;
    private final MemberRepository memberRepository;
    private final ApiRepository apiRepository;

    public void checkApply(Long apiId, String id) {

        purposeRepository.findByApiIdAndMemberId(apiId, memberRepository.findById(id).get().getMemberId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_REGISTERED_API));

    }

    @Transactional
    public void register(RegisterPurposeRequest request, String id){

        purposeRepository.findByApiAndMember(request.getApiId(), id)
                .ifPresent((e) -> {
                    throw new CustomException(ErrorCode.PURPOSE_DUPLICATED);
                });

        Purpose purpose = Purpose.builder()
                .api(apiRepository.findByApiId(request.getApiId()))
                .industry(request.getIndustry())
                .member(memberRepository.findById(id).get())
                .build();

        purposeRepository.save(purpose);

    }
}
