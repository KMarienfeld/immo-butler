package de.neuefische.backend.service;

import java.util.UUID;

public class GenerateIDService {
    public String generateExpenseCategoryUUID() {
        return "E" + UUID.randomUUID();
    }
}
