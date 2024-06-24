package com.taskify.advice;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.taskify.exceptions.ResourceNotFoundException;
import com.taskify.utils.ErrorMessage;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@Component
@ControllerAdvice
public class AppControllerAdvice {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolationExceptions(ConstraintViolationException ex) {
        Set<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations();

        return new ResponseEntity<>(
                new ErrorMessage(
                    constraintViolations.stream()
                        .map(constraintViolation -> constraintViolation.getMessage())
                        .collect(Collectors.toList())
                        .get(0)
                ),
                HttpStatus.BAD_REQUEST
            );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(new ErrorMessage(ex.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>(new ErrorMessage(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

}
