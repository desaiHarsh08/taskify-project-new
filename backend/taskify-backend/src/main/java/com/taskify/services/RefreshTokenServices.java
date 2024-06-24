package com.taskify.services;

import com.taskify.models.RefreshTokenModel;

public interface RefreshTokenServices {

    public RefreshTokenModel createRefreshToken(String username);

    public RefreshTokenModel verifyRefreshToken(String refreshToken);

}
