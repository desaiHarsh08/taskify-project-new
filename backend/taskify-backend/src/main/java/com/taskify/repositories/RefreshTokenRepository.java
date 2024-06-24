package com.taskify.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskify.models.RefreshTokenModel;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenModel, Long> {

    public RefreshTokenModel findByRefreshToken(String refreshToken);

    public RefreshTokenModel findByEmail(String email);

}
