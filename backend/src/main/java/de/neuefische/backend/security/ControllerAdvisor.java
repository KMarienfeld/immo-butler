package de.neuefische.backend.security;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ControllerAdvisor {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = getErrorMessage(fieldName);
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        String errorMessage = ex.getMessage();
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", errorMessage);
        return ResponseEntity.badRequest().body(errorResponse);
    }

    private String getErrorMessage(String fieldName) {
        if (fieldName.equals("firstname")) {
            return "Vorname darf nur Buchstaben enthalten";
        }
        if (fieldName.equals("lastname")) {
            return "Nachname darf nur Buchstaben enthalten";
        }
        if (fieldName.equals("email")) {
            return "Email Adresse hat kein gültiges Format";
        }
        if (fieldName.equals("password")) {
            return "Passwort muss aus mind. 8 Zeichen bestehen";
        }
        return "Ungültige Eingabe(n)";
    }
}
