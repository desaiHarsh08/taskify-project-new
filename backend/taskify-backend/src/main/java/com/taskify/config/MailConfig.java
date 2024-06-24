package com.taskify.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.taskify.constants.MailConstants;

import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender getJavaMailSender() {
        Dotenv dotenv = Dotenv.configure().load();

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(dotenv.get(MailConstants.AWS_REGION));
        mailSender.setPort(MailConstants.AWS_SMTP_PORT);

        mailSender.setUsername(dotenv.get(MailConstants.AWS_ACCESS_KEY_ID));
        mailSender.setPassword(dotenv.get(MailConstants.AWS_SECRET_ACCESS_KEY));

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

}
