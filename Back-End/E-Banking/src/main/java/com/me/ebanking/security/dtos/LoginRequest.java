package com.me.ebanking.security.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LoginRequest{
    @NotEmpty
    String email;
    @NotEmpty
    String password;
}