package com.backend.backend.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    private final TokenManager tokenManager;

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenFilter.class);

    public JwtTokenFilter(TokenManager tokenManager) {
        this.tokenManager = tokenManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Get headers from each request
        String authHeader = request.getHeader("Authorization");

        String email = null;
        String token = null;

        if (authHeader != null && authHeader.contains("Bearer")) {
            token = authHeader.split("\\s+")[1];

            logger.info("token is", token);
            logger.info("burdayım tak diye");

            try {
                email = tokenManager.getSubject(token);
            } catch (Exception e) {
                response.setHeader("Set-Cookie", "isLoggedIn=false");
                throw e;
            }
        }

        if (email != null &&
                SecurityContextHolder.getContext().getAuthentication() == null &&
                token != null) { // If token is valid
            logger.info("Authentication passed for user: {}", email);

            response.setHeader("Set-Cookie", "isLoggedIn=true");
            // Create a new authentication
            var authentication = new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            logger.info("credentiallllllls", authentication.getCredentials());
            logger.info("principal", authentication.getPrincipal());
            logger.info("auth is security context", SecurityContextHolder.getContext().getAuthentication());
            // Set the authentication in the context
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

}
