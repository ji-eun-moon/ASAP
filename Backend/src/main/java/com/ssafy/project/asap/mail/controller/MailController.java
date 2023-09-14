package com.ssafy.project.asap.mail.controller;

import com.ssafy.project.asap.mail.dto.request.EmailRequest;
import com.ssafy.project.asap.mail.service.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @PostMapping("/auth-email")
    public ResponseEntity<?> authEmail(@RequestBody EmailRequest emailRequest) throws MessagingException {
        
        mailService.authEmail(emailRequest.getEmail());
        
        return ResponseEntity.status(200).body("이메일 전송 완료");
    }

}
