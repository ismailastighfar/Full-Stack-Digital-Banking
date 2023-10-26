package com.me.ebanking.security.exceptions;

import lombok.Data;


@Data
public class IncorrectCredentialsException extends RuntimeException {
    public IncorrectCredentialsException() {
    }

    public IncorrectCredentialsException(String message) {
        super(message);
    }

    public IncorrectCredentialsException(String message, Throwable cause) {
        super(message, cause);
    }

    public IncorrectCredentialsException(Throwable cause) {
        super(cause);
    }
}
