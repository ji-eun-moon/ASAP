package com.ssafy.project.asap.apply.service;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.apply.entity.domain.ApplyProgress;
import com.ssafy.project.asap.apply.entity.dto.request.RegisterApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.request.UpdateApplyRequest;
import com.ssafy.project.asap.apply.entity.dto.response.FindApplyResponse;
import com.ssafy.project.asap.apply.entity.dto.response.FindApplysResponse;
import com.ssafy.project.asap.apply.repository.ApplyRepository;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ApplyService {

    private final ApplyRepository applyRepository;
    private final MemberRepository memberRepository;
    private final ApiRepository apiRepository;

    public FindApplyResponse findByApplyId(long applyId){

        log.info("applyId = " + applyId);

        return new FindApplyResponse(applyRepository.findByApplyId(applyId));

    }

    @Transactional
    public void signup(RegisterApplyRequest request, String id){

        applyRepository.findByApiAndMethod(request.getApi(), request.getMethod())
                .ifPresent((e) -> {
                    throw new RuntimeException("이미 등록된 API입니다.");
                });

        Apply apply = Apply.builder()
                .api(request.getApi())
                .title(request.getTitle())
                .content(request.getContent())
                .input(request.getInput())
                .output(request.getOutput())
                .progress(ApplyProgress.대기)
                .price(request.getPrice())
                .method(request.getMethod())
                .member(memberRepository.findById(id).get())
                .provideDate(request.getProvideDate())
                .tags(request.getTags())
                .build();

        applyRepository.save(apply);

    }

    public List<FindApplysResponse> findByMember(Member member){

        List<FindApplysResponse> list = new ArrayList<>();

        for(Apply apply : applyRepository.findByMember(member)){
            list.add(new FindApplysResponse(apply));
        }

        return list;

    }

    public List<FindApplysResponse> findAll() {

        List<FindApplysResponse> list = new ArrayList<>();

        for(Apply apply : applyRepository.findAll()){
            list.add(new FindApplysResponse(apply));
        }

        return list;

    }

    @Transactional
    public void updateProgress(UpdateApplyRequest updateApplyRequest){

        Apply apply = applyRepository.findByApplyId(updateApplyRequest.getApplyId());

        if(updateApplyRequest.getProgress().equals(ApplyProgress.승인)){

            Api api = Api.builder()
                    .api(apply.getApi())
                    .title(apply.getTitle())
                    .content(apply.getContent())
                    .price(apply.getPrice())
                    .input(apply.getInput())
                    .output(apply.getOutput())
                    .member(apply.getMember())
                    .provideDate(apply.getProvideDate())
                    .build();

            apiRepository.save(api);
        }

        apply.setProgress(updateApplyRequest.getProgress());

    }

    @Transactional
    public void rejectProgress(Long applyId){

        Apply apply = applyRepository.findByApplyId(applyId);

        apply.setProgress(ApplyProgress.거절);

    }
}
