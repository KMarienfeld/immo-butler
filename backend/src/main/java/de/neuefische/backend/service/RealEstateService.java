package de.neuefische.backend.service;

import de.neuefische.backend.model.RealEstateDTO;
import de.neuefische.backend.model.RealEstateModel;
import de.neuefische.backend.repository.RealEstateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

        return realEstateRepository.save(newRealEstateModel);
    }
}
