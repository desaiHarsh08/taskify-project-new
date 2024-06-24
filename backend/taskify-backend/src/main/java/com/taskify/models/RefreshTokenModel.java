package com.taskify.models;

import java.time.Instant;

import com.taskify.constants.ModelConstants;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = ModelConstants.REFRESH_TOKEN_TABLE)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class RefreshTokenModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String refreshToken;

    private String email;

    private Instant expiry;

}
