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
        return saveNewRealEstate(createRealEstateModel(generateIDService.generateRealEstateUUID(), realEstateDTO));
    }
    public List<RealEstateModel> getAllRealEstates() {
        return realEstateRepository.findAll();
    }

    public RealEstateModel editRealEstate(String id, RealEstateDTO realEstateDTO) {
        findRealEstateById(id);
        return saveNewRealEstate(createRealEstateModel(id, realEstateDTO));
    }
    public String deleteRealEstate(String id) {
        findRealEstateById(id);
        realEstateRepository.deleteById(id);
        return id;
    }
    private RealEstateModel saveNewRealEstate(RealEstateModel realEstateModel) {
        return realEstateRepository.save(realEstateModel);
    }

    private RealEstateModel createRealEstateModel( String id, RealEstateDTO realEstateDTO) {
        RealEstateModel newRealEstateModel = new RealEstateModel();
        newRealEstateModel.setId(id);
        newRealEstateModel.setDesignationOfRealEstate(realEstateDTO.getDesignationOfRealEstate());
        newRealEstateModel.setRoadOfRealEstate(realEstateDTO.getRoadOfRealEstate());
        newRealEstateModel.setHouseNumberOfRealEstate(realEstateDTO.getHouseNumberOfRealEstate());
        newRealEstateModel.setPostCodeOfRealEstate(realEstateDTO.getPostCodeOfRealEstate());
        newRealEstateModel.setLocationOfRealEstate(realEstateDTO.getLocationOfRealEstate());
        newRealEstateModel.setGenderOfTenant(realEstateDTO.getGenderOfTenant());
        newRealEstateModel.setFirstNameOfTenant(realEstateDTO.getFirstNameOfTenant());
        newRealEstateModel.setLastNameOfTenant(realEstateDTO.getLastNameOfTenant());
        newRealEstateModel.setListOfExpenseCategories(realEstateDTO.getListOfExpenseCategories());
        return newRealEstateModel;
    }

    private RealEstateModel findRealEstateById(String id) {
        return realEstateRepository.findById(id).orElseThrow(() -> new RuntimeException("Id not found"));
    }
}
