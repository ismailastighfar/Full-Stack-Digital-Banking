package com.me.ebanking.security.exceptions;

import lombok.Data;


@Data
public class InvalidJwtTokenException extends RuntimeException {
    public InvalidJwtTokenException() {
    }

    public InvalidJwtTokenException(String message) {
        super(message);
    }

    public InvalidJwtTokenException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidJwtTokenException(Throwable cause) {
        super(cause);
    }
}
