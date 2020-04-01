package com.eworld.ApiGateway.services;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class MailService {

	@Autowired
	private JavaMailSender javaMailSender;
	
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	public static int noOfQuickServiceThreads = 5;
	private ScheduledExecutorService quickService = Executors.newScheduledThreadPool(noOfQuickServiceThreads); 

	public void sendEmail(String email, String subject, String text) throws MailException,RuntimeException{
			LOGGER.info("Sending emial:  "+email);
			SimpleMailMessage mail = new SimpleMailMessage(); 
			mail.setTo("cheryl123liu@gmail.com");
			mail.setSubject(subject);
			mail.setText(text);
			quickService.submit(new Runnable() {
				@Override
				public void run() {
					try{
						javaMailSender.send(mail);
					}catch(Exception e){
						LOGGER.info("Exception occur while send a mail : ",e);
					}
				}
			});
	}

}