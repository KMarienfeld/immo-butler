package de.immoButler.backend.fixAndFlip.service;

import de.immoButler.backend.fixAndFlip.model.CalculationApartment;
import de.immoButler.backend.fixAndFlip.model.CalculationHouse;
import de.immoButler.backend.fixAndFlip.repository.CalculationHouseRepository;
import de.immoButler.backend.fixAndFlip.repository.CalculationApartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalculatorService {
    private final CalculationApartmentRepository calculationApartmentRepository;
    private final CalculationHouseRepository calculationHouseRepository;

    public List<CalculationApartment> getAllApartmentCalculations() {
        return calculationApartmentRepository.findAll();
    }

    public List<CalculationHouse> getAllHouseCalculations() {
        return calculationHouseRepository.findAll();
    }
}
