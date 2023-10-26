package com.me.ebanking.security.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class LoginResponse {
        private String AccessToken;
        private String refreshToken;
}