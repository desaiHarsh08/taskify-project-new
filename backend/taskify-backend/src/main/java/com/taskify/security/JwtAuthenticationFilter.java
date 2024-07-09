package com.taskify.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.taskify.services.RefreshTokenServices;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private RefreshTokenServices refreshTokenServices;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException, java.io.IOException {


//                 System.out.println("JwtAuthenticationFilter: doFilterInternal method called");

//         String email = null, token = null;

//         // Get the token from the request's header
//         String bearerToken = request.getHeader("Authorization"); // "Bearer <token>"
//         String refreshToken = request.getHeader("RefreshToken");

//         System.out.println(bearerToken);

//         // Check if the token is correct
//         if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
//             token = bearerToken.substring(7);
//             try {
//                 email = this.jwtTokenHelper.getUsernameFromToken(token);
//             } 
//             catch (IllegalArgumentException | MalformedJwtException illegalArgumentException) {
//                 throw new IllegalArgumentException("Invalid token");
//             } catch (ExpiredJwtException expiredJwtException) {
//                 response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT expired");
//                 // return;
// //                throw expiredJwtException;


//             }
//         }

//         // Validate the token
//         if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//             UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
//             if(this.jwtTokenHelper.validateToken(token, userDetails)) {
//                 UsernamePasswordAuthenticationToken authenticationToken =
//                         new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

//                 authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

//                 SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//             }
//             else {
//                 throw new RuntimeException("INVALID JWT TOKEN");
//             }
//         }

//         System.out.println(request);

//         //  Forward the request further
//         filterChain.doFilter(request, response);

//     }

@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException, java.io.IOException {

    System.out.println("JwtAuthenticationFilter: doFilterInternal method called");

    String email = null, token = null;

    // Get the token from the request's header
    String bearerToken = request.getHeader("Authorization"); // "Bearer <token>"
    String refreshToken = request.getHeader("RefreshToken");

    System.out.println("Bearer Token: " + bearerToken);
    System.out.println("Refresh Token: " + refreshToken);

    // Check if the token is correct
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
        token = bearerToken.substring(7);
        try {
            email = this.jwtTokenHelper.getUsernameFromToken(token);
            System.out.println("Email from token: " + email);
        } catch (IllegalArgumentException | MalformedJwtException illegalArgumentException) {
            System.err.println("Invalid token: " + illegalArgumentException.getMessage());
            throw new IllegalArgumentException("Invalid token");
        } catch (ExpiredJwtException expiredJwtException) {
            System.err.println("JWT expired: " + expiredJwtException.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT expired");
            return;
        } catch (Exception e) {
            System.err.println("Authentication failed: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication failed: " + e.getMessage());
            return;
        }
    } else {
        System.err.println("Bearer token is null or does not start with 'Bearer '");
    }

    // Validate the token
    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
        if (this.jwtTokenHelper.validateToken(token, userDetails)) {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            System.out.println("Token validated, setting authentication context");
        } else {
            System.err.println("Invalid token");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return;
        }
    }

    System.out.println("Request: " + request);

    // Forward the request further
    filterChain.doFilter(request, response);

    System.out.println("JwtAuthenticationFilter: doFilterInternal method completed");
}

}
