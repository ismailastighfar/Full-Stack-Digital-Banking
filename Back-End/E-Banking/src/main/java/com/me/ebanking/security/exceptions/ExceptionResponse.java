package com.me.ebanking.security.exceptions;

import lombok.Builder;

import java.util.List;

@Builder
public record ExceptionResponse(
        int code,
        String status,
        String message,
        List<String> identifiers,
        List<ValidationError> errors
) {
    @Builder
    public record ValidationError(
            String field,
            String message
    ) {
    }
}
