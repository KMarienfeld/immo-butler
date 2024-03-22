package de.neuefische.backend.service;

import de.neuefische.backend.model.RealEstateDTO;
import de.neuefische.backend.model.RealEstateModel;
import de.neuefische.backend.repository.RealEstateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RealEstateService {
    private final RealEstateRepository realEstateRepository;
    private final GenerateIDService generateIDService;

    public RealEstateModel addNewRealEstate(RealEstateDTO realEstateDTO) {
        RealEstateModel newRealEstateModel = new RealEstateModel();
        newRealEstateModel.setId(generateIDService.generateRealEstateUUID());
        newRealEstateModel.setDesignationOfRealEstate(realEstateDTO.getDesignationOfRealEstate());
        newRealEstateModel.setRoadOfRealEstate(realEstateDTO.getRoadOfRealEstate());
        newRealEstateModel.setHouseNumberOfRealEstate(realEstateDTO.getHouseNumberOfRealEstate());
        newRealEstateModel.setPostCodeOfRealEstate(realEstateDTO.getPostCodeOfRealEstate());
        newRealEstateModel.setLocationOfRealEstate(realEstateDTO.getLocationOfRealEstate());
        newRealEstateModel.setGenderOfTenant(realEstateDTO.getGenderOfTenant());
        newRealEstateModel.setFirstNameOfTenant(realEstateDTO.getFirstNameOfTenant());
        newRealEstateModel.setLastNameOfTenant(realEstateDTO.getLastNameOfTenant());
        newRealEstateModel.setListOfExpenseCategories(realEstateDTO.getListOfExpenseCategories());
        newRealEstateModel.setUtilityBills(realEstateDTO.getUtilityBills());

        return realEstateRepository.save(newRealEstateModel);
    }

    public List<RealEstateModel> getAllRealEstates() {
        return realEstateRepository.findAll();
    }

    public RealEstateModel editRealEstate(String id, RealEstateDTO realEstateDTO) {
        RealEstateModel actualRealEstate = realEstateRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        actualRealEstate.setDesignationOfRealEstate(realEstateDTO.getDesignationOfRealEstate());
        actualRealEstate.setRoadOfRealEstate(realEstateDTO.getRoadOfRealEstate());
        actualRealEstate.setHouseNumberOfRealEstate(realEstateDTO.getHouseNumberOfRealEstate());
        actualRealEstate.setPostCodeOfRealEstate(realEstateDTO.getPostCodeOfRealEstate());
        actualRealEstate.setLocationOfRealEstate(realEstateDTO.getLocationOfRealEstate());
        actualRealEstate.setGenderOfTenant(realEstateDTO.getGenderOfTenant());
        actualRealEstate.setFirstNameOfTenant(realEstateDTO.getFirstNameOfTenant());
        actualRealEstate.setLastNameOfTenant(realEstateDTO.getLastNameOfTenant());
        actualRealEstate.setListOfExpenseCategories(realEstateDTO.getListOfExpenseCategories());

        return realEstateRepository.save(actualRealEstate);
    }

    public RealEstateModel deleteRealEstate(String id) {
        RealEstateModel actualRealEstate = realEstateRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
        realEstateRepository.deleteById(id);
        return actualRealEstate;
    }
}
