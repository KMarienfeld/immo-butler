package de.immoButler.backend.buyAndHold.service;

import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
public class GenerateIDService {

    public String generateCustomExpenseCategoryUUID() {
        return "CE" + UUID.randomUUID();
    }

    public String generateUtilityBillUUID() {
        return "U" + UUID.randomUUID();
    }

    public String generateRealEstateUUID() {
        return "RE" + UUID.randomUUID();
    }

    public String generateUserUUID() {
        return "UR" + UUID.randomUUID();
    }

}
