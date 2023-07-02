package de.neuefische.backend.controller;

import de.neuefische.backend.model.RealEstateDTO;
import de.neuefische.backend.model.RealEstateModel;
import de.neuefische.backend.service.RealEstateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/realEstate")
@RequiredArgsConstructor
public class RealEstateController {

    private final RealEstateService realEstateService;

    @PostMapping("/add")
    public RealEstateModel addNewRealEstate(@RequestBody RealEstateDTO realEstateDTO) {
        return realEstateService.addNewRealEstate(realEstateDTO);
    }

    @GetMapping("/get-all")
    public List<RealEstateModel> getAllRealEstates() {
        return realEstateService.getAllRealEstates();
    }

    @PutMapping("edit/{id}")
    public RealEstateModel editRealEstate(@PathVariable String id, @RequestBody RealEstateDTO realEstateDTO) {
        return realEstateService.editRealEstate(id, realEstateDTO);
    }
}
