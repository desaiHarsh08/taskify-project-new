package com.taskify.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskify.dtos.UserDto;
import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.models.RefreshTokenModel;
import com.taskify.models.UserModel;
import com.taskify.repositories.UserRepository;
import com.taskify.security.JwtTokenHelper;
import com.taskify.services.RefreshTokenServices;
import com.taskify.services.UserServices;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String email;
}

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
class AuthRequest {
    private String email;
    private String password;
}

@RestController
@RequestMapping("/auth")
public class AuthController {

     @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserServices userServices;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenServices refreshTokenServices;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        UserDto createdUserDto = this.userServices.createUser(userDto);
        if(userDto == null) {
            return new ResponseEntity<>("User already exist!", HttpStatus.CONFLICT);
        }
        else {
            return new ResponseEntity<>(createdUserDto, HttpStatus.OK);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> doLogin(@RequestBody AuthRequest authRequest) {
        System.out.println(authRequest);
        this.authenticateUser(authRequest.getEmail(), authRequest.getPassword());

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(authRequest.getEmail());

        String accessToken = this.jwtTokenHelper.generateToken(userDetails);
        AuthResponse authResponse = new AuthResponse(
            accessToken, 
            this.refreshTokenServices.createRefreshToken(authRequest.getEmail()).getRefreshToken(),
            authRequest.getEmail()
        );

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private void authenticateUser(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        this.authenticationManager.authenticate(authenticationToken);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> json) {
        RefreshTokenModel refreshTokenModel = this.refreshTokenServices.verifyRefreshToken(json.get("refreshToken"));

        UserModel userModel = this.userRepository.findByEmail(refreshTokenModel.getEmail()).orElseThrow(
            () -> new ResourceNotFoundException(("No user exist for email: " + refreshTokenModel.getEmail()))
        );

        String accessToken = this.jwtTokenHelper.generateToken(this.userDetailsService.loadUserByUsername(userModel.getEmail()));

        AuthResponse authResponse = new AuthResponse(
            accessToken, 
            refreshTokenModel.getRefreshToken(),
            userModel.getEmail()
        );

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @GetMapping("/test")
    public Object testApi() {
        System.out.println("Test api");
        return null;
    }

}
