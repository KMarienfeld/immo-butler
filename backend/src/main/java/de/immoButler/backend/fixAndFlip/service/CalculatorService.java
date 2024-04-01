package de.immoButler.backend.fixAndFlip.service;

import de.immoButler.backend.fixAndFlip.model.CalculationApartment;
import de.immoButler.backend.fixAndFlip.repository.CalculatorApartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalculatorService {
    private final CalculatorApartmentRepository calculatorApartmentRepository;

    public List<CalculationApartment> getAllApartmentCalculations() {
        return calculatorApartmentRepository.findAll();
    }
}
