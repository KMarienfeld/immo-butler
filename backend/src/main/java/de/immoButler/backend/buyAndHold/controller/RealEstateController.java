package de.immoButler.backend.buyAndHold.controller;

import de.immoButler.backend.buyAndHold.model.RealEstateDTO;
import de.immoButler.backend.buyAndHold.model.RealEstateModel;
import de.immoButler.backend.buyAndHold.service.RealEstateService;
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

    @PutMapping("/edit/{id}")
    public RealEstateModel editRealEstate(@PathVariable String id, @RequestBody RealEstateDTO realEstateDTO) {
        return realEstateService.editRealEstate(id, realEstateDTO);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRealEstate(@PathVariable String id) {
        return realEstateService.deleteRealEstate(id);
    }
}
