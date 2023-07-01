package de.neuefische.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/realEstate")
@RequiredArgsConstructor
public class RealEstateController {

    private final RealEstateService realEstateService;

    @PostMapping("/add")
    public RealEstateModel addNewRealEstate(@RequestBody RealEstateDTO realEstateDTO) {
        return realEstateService.addNewRealEstate(realEstateDTO);
    }

}
