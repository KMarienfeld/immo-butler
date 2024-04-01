package de.immoButler.backend.fixAndFlip.controller;

import de.immoButler.backend.fixAndFlip.model.CalculationApartment;
import de.immoButler.backend.fixAndFlip.service.CalculatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fixFlip/calculation")
@RequiredArgsConstructor
public class CalculatorController {

    private final CalculatorService calculatorService;

    @GetMapping("/apartment/getAll")
    public List<CalculationApartment> getAllApartmentCalculations() {
        return calculatorService.getAllApartmentCalculations();
    }
}
