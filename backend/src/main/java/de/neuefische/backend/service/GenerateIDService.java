package de.neuefische.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
public class GenerateIDService {
    public String generateExpenseCategoryUUID() {
        return "E" + UUID.randomUUID();
    }
}
