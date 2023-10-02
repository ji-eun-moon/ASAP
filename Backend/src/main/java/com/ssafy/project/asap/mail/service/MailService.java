package com.ssafy.project.asap.mail.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final JavaMailSender javaMailSender;

    public void authEmail(String email) throws MessagingException {

        String pwd = createCode();

        String setFrom = "victoryddh@gmail.com";
        String title = "ASAP 회원가입 인증번호 입니다.";

        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);
        message.setSubject(title);

        String emailMsg = "";
        emailMsg += "<div style='margin:20px;'>";
        emailMsg += "<h1> 안녕 나는 ASAP 관리자 O.O </h1>";
        emailMsg += "<br>";
        emailMsg += "<p>아래 코드를 입력해줘<p>";
        emailMsg += "<br>";
        emailMsg += "<p>고마웡~ O.<<p>";
        emailMsg += "<br>";
        emailMsg += "<div align='center' style='border:1px solid gray; box-shadow: 5px 5px 5px 5px gray; font-family:verdana';>";
        emailMsg += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        emailMsg += "<div style='font-size:130%'>";
        emailMsg += "CODE : <strong>";
        emailMsg += pwd + "</strong><div><br/> ";
        emailMsg += "</div>";

        message.setFrom(setFrom);
        message.setText(emailMsg, "utf-8", "html");

        log.info("pwd = " + pwd);

        javaMailSender.send(message);
    }


    public static String createCode(){
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for(int i = 0 ; i < 8 ; i++){

            int idx = random.nextInt(3);

            switch (idx) {
                case 0 -> key.append((char) (random.nextInt(26) + 97));
                case 1 -> key.append((char) (random.nextInt(26) + 65));
                case 2 -> key.append( (random.nextInt(9)));
            }

        }
        return key.toString();
    }

}
