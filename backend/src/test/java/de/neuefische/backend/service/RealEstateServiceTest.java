package de.neuefische.backend.service;

import de.neuefische.backend.model.RealEstateDTO;
import de.neuefische.backend.model.RealEstateModel;
import de.neuefische.backend.repository.RealEstateRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static de.neuefische.backend.model.GenderOfTenant.MALE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class RealEstateServiceTest {

    private final RealEstateRepository realEstateRepository = mock(RealEstateRepository.class);
    private final GenerateIDService generateIDService = mock(GenerateIDService.class);
    private final RealEstateService realEstateService = new RealEstateService(realEstateRepository, generateIDService);


    @Test
    void when_addNewRealEstateDTO_then_ReturnNewRealEstateModel() {
        //GIVEN
        RealEstateDTO realEstateDTO = new RealEstateDTO("Musterimmobilie", "Musterstraße", "1", 77749, "Musterstadt", MALE, "Max", "Mustermann");
        String testID = "10";
        when(generateIDService.generateRealEstateUUID()).thenReturn(testID);
        RealEstateModel expected = new RealEstateModel("10", "Musterimmobilie", "Musterstraße", "1", 77749, "Musterstadt", MALE, "Max", "Mustermann");
        when(realEstateRepository.save(any())).thenReturn(expected);
        //WHEN
        RealEstateModel actual = realEstateService.addNewRealEstate(realEstateDTO);
        //THEN
        verify(generateIDService).generateRealEstateUUID();
        verify(realEstateRepository).save(any());
        assertEquals(expected, actual);
    }

    @Test
    void when_getAllRealEstate_then_returnAllRealEstate() throws Exception {
        //GIVEN
        RealEstateModel realEstateModel = new RealEstateModel("10", "Musterimmobilie", "Musterstraße", "1", 77749, "Musterstadt", MALE, "Max", "Mustermann");
        when(realEstateRepository.findAll()).thenReturn(List.of(realEstateModel));
        //WHEN
        List<RealEstateModel> actual = realEstateService.getAllRealEstates();
        //THEN
        verify(realEstateRepository).findAll();
        assertEquals(actual, List.of(realEstateModel));
    }
}