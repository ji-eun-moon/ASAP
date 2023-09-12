package com.ssafy.project.asap.apply.service;

import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.apply.repository.ApplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplyService {

    private final ApplyRepository applyRepository;

    public Apply findByApplyId(long applyId){

        return applyRepository.findByApplyId(applyId);

    }

}
