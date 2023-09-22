package com.ssafy.project.asap.global.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
public class SchedulerTask {

    @Scheduled(fixedDelay = 3000)
    public void task1(){

        log.info("Current Time = " + LocalDateTime.now());

    }

}
