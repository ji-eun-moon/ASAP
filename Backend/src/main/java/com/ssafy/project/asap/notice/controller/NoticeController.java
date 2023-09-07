package com.ssafy.project.asap.notice.controller;

import com.ssafy.project.asap.notice.entity.dto.response.NoticeListResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/notice")
public class NoticeController {

    @GetMapping("/list-count")
    public ResponseEntity<?> listCount(){

        // 아직 읽지 않은 알림 메시지 갯수 출력
        Long unreadAlarm = 3L;

        return ResponseEntity.ok().body("아직 읽지 않은 메시지 = " + unreadAlarm);
    }

    @GetMapping("/notice/list")
    public ResponseEntity<?> list(){

        // 내 알림 메시지 리스트 조회
        List<NoticeListResponse> list = new ArrayList<>();

        list.add(NoticeListResponse.builder()
                        .noticeId(1L)
                        .title("제목1")
                        .content("내용1")
                        .createDate(LocalDateTime.now().minusMinutes(1))
                        .isRead(false)
                .build());

        list.add(NoticeListResponse.builder()
                .noticeId(2L)
                .title("제목2")
                .content("내용2")
                .createDate(LocalDateTime.now())
                .isRead(false)
                .build());

        return ResponseEntity.ok().body("메시지 리스트 = " + list);
    }

    @DeleteMapping("/delete/{notice_id}")
    public ResponseEntity<?> delete(@PathVariable("notice_id") Long noticeId){

        // 알림 메시지 삭제


        return ResponseEntity.ok().body(noticeId + "번 알림 메시지 삭제");
    }

    @GetMapping("/check/{notice_id}")
    public ResponseEntity<?> check(@PathVariable("notice_id") Long noticeId){

        // 알림 메시지 읽음 상태 변경

        return ResponseEntity.ok().body(noticeId + "번 알림 메시지 읽음");
    }

}
