package de.neuefische.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class GenerateIDServiceTest {

    private final GenerateIDService generateIDService = new GenerateIDService();

    @Test
    void generateUserUUID() {
        String actual = generateIDService.generateUserUUID();
        Assertions.assertTrue(actual.startsWith("UR"));
    }
}