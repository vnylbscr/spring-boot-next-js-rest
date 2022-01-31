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
        final String authHeader = request.getHeader("Authorization");

        String email = null;
        String token = null;

        if (authHeader != null && authHeader.contains("Bearer")) {
            token = authHeader.split("\\s+")[1];

            System.out.println("token is " + token);
            try {
                email = tokenManager.getSubject(token);
            } catch (Exception e) {
                throw e;
            }
        }

        if (email != null && token != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (tokenManager.validateToken(token)) {
                UsernamePasswordAuthenticationToken upassToken = new UsernamePasswordAuthenticationToken(email, null,
                        new ArrayList<>());
                upassToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(upassToken);
            }
        }

        response.setHeader("refreshToken", "merto lala");

        filterChain.doFilter(request, response);
    }

}
