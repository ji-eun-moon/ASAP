package com.ssafy.project.asap.notice.service;

import com.ssafy.project.asap.apply.entity.dto.request.RejectApplyRequest;
import com.ssafy.project.asap.apply.repository.ApplyRepository;
import com.ssafy.project.asap.notice.entity.domain.Notice;
import com.ssafy.project.asap.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final ApplyRepository applyRepository;

    @Transactional
    public void saveRejectApply(RejectApplyRequest request){

        Notice notice = Notice.builder()
                .title(request.getTitle() + "건에 대한 거절 사유입니다.")
                .content(request.getTitle())
                .member(applyRepository.findByApplyId(request.getApplyId()).getMember())
                .build();

        noticeRepository.save(notice);
    }

}
