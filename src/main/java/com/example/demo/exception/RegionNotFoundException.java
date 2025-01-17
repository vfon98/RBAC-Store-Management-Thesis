package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RegionNotFoundException extends RuntimeException {
    public RegionNotFoundException() {
        super("404 Region not found!");
    }
}
