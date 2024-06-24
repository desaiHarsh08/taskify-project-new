package com.taskify.services.impl;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskify.models.RefreshTokenModel;
import com.taskify.repositories.RefreshTokenRepository;
import com.taskify.services.RefreshTokenServices;

@Service
public class RefreshTokenServicesImpl implements RefreshTokenServices {

    private static final long REFRESH_TOKEN_EXPIRY = 30L * 24 * 60 * 60 * 1000;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenModel createRefreshToken(String username) {
        RefreshTokenModel existingRefreshTokenModel = this.refreshTokenRepository.findByEmail(username);
         if(existingRefreshTokenModel == null) {
             RefreshTokenModel refreshTokenModel = RefreshTokenModel.builder()
                    .refreshToken(UUID.randomUUID().toString())
                    .expiry(Instant.now().plusMillis(REFRESH_TOKEN_EXPIRY))
                    .email(username)
                    .build();
             return this.refreshTokenRepository.save(refreshTokenModel);

         }
         existingRefreshTokenModel.setExpiry(Instant.now().plusMillis(REFRESH_TOKEN_EXPIRY));
        return this.refreshTokenRepository.save(existingRefreshTokenModel);
    }

    public RefreshTokenModel verifyRefreshToken(String refreshToken) {
        RefreshTokenModel refreshTokenModel = this.refreshTokenRepository.findByRefreshToken(refreshToken);
        if(refreshToken == null) {
            throw new IllegalArgumentException("Invalid refresh token");
        }
        else if(refreshTokenModel.getExpiry().compareTo(Instant.now()) < 0) {
            this.refreshTokenRepository.delete(refreshTokenModel);
            // throw new ExpiredRefreshTokenException(refreshToken, refreshTokenModel.getUserModel().getEmail());
        }
        return refreshTokenModel;
    }

}
