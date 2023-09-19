package com.ssafy.project.asap.notice.service;

import com.ssafy.project.asap.apply.entity.dto.request.RejectApplyRequest;
import com.ssafy.project.asap.apply.repository.ApplyRepository;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.notice.entity.domain.Notice;
import com.ssafy.project.asap.notice.entity.dto.response.FindNoticesResponse;
import com.ssafy.project.asap.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final ApplyRepository applyRepository;

    public void saveRejectApply(RejectApplyRequest request){

        Notice notice = Notice.builder()
                .title(request.getTitle() + "건에 대한 거절 사유입니다.")
                .content(request.getTitle())
                .member(applyRepository.findByApplyId(request.getApplyId()).getMember())
                .build();

        noticeRepository.save(notice);
    }

    @Transactional
    public void update(Long noticeId){

        noticeRepository.findByNoticeId(noticeId).setRead(true);

    }

    @Transactional
    public List<FindNoticesResponse> findAll(Member member){

        List<FindNoticesResponse> list = new ArrayList<>();

        for(Notice notice : noticeRepository.findAllByMember(member)){
            list.add(new FindNoticesResponse(notice));
        }

        return list;
    }

    public Long findUnRead(Member member) {

        List<Notice> list = noticeRepository.findAllByMember(member);

        Long unReadMessage = 0L;

        for(Notice notice : list){
            if(notice.isRead() == false){
                unReadMessage++;
            }
        }

        return unReadMessage;

    }

    @Transactional
    public void delete(Long noticeId) {

        Notice notice = noticeRepository.findByNoticeId(noticeId);

        noticeRepository.delete(notice);

    }
}
