package com.ssafy.project.asap.mail.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;

    public void authEmail(String email) throws MessagingException {

        String pwd = createCode();

        String setFrom = "admin@asap.com";
        String title = "ASAP 회원가입 인증번호 입니다.";

        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject(title);

        String emailMsg = "";
        emailMsg += "<div style='margin:20px;'>";
        emailMsg += "<h1> 안녕하세요 test 입니다. </h1>";
        emailMsg += "<br>";
        emailMsg += "<p>아래 코드를 입력해주세요<p>";
        emailMsg += "<br>";
        emailMsg += "<p>감사합니다.<p>";
        emailMsg += "<br>";
        emailMsg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        emailMsg += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        emailMsg += "<div style='font-size:130%'>";
        emailMsg += "CODE : <strong>";
        emailMsg += pwd + "</strong><div><br/> ";

        message.setFrom(setFrom);
        message.setText(emailMsg);

        javaMailSender.send(message);
    }


    public String createCode(){
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for(int i = 0 ; i < 8 ; i++){

            int idx = random.nextInt(3);

            switch (idx){
                case 0:
                    key.append((char) (random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) (random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append((char) (random.nextInt(9)));
                    break;
            }

        }
        return key.toString();
    }

}
