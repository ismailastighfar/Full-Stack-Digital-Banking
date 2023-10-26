package com.me.ebanking.security.exceptions;

import com.me.ebanking.security.Util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Locale;
import java.util.Objects;

@Slf4j
@RestControllerAdvice
public class SecurityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IncorrectCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ExceptionResponse> handleInvalidCredentialsException(IncorrectCredentialsException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .code(HttpStatus.UNAUTHORIZED.value())
                                .status(HttpStatus.UNAUTHORIZED.name())
                                .message(getMessage(
                                        JwtUtil.SecurityExceptionMessage.INVALID_CREDENTIALS,
                                        null))
                                .build()
                );
    }

    @ExceptionHandler(InvalidJwtTokenException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ExceptionResponse> handleInvalidTokenException(InvalidJwtTokenException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .code(HttpStatus.UNAUTHORIZED.value())
                                .status(HttpStatus.UNAUTHORIZED.name())
                                .message(getMessage(
                                        JwtUtil.SecurityExceptionMessage.INVALID_TOKEN,
                                        null))
                                .build()
                );
    }

    private String getMessage(String key, Object[] args) {
        return Objects.requireNonNull(getMessageSource())
                .getMessage(key, args, Locale.getDefault());
    }

}
