package de.neuefische.backend.service;

import de.neuefische.backend.model.CustomExpenseCategoryDTO;
import de.neuefische.backend.model.CustomExpenseCategoryModel;
import de.neuefische.backend.model.UtilityBillDTOModel;
import de.neuefische.backend.model.UtilityBillModel;
import de.neuefische.backend.repository.UtilityBillRepository;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static de.neuefische.backend.model.DistributionKey.UNITBASEDKEY;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class UtilityBillServiceTest {

    private final UtilityBillRepository utilityBillRepository = mock(UtilityBillRepository.class);
    private final GenerateIDService generateIDService = mock(GenerateIDService.class);
    private final UtilityBillService utilityBillService = new UtilityBillService(utilityBillRepository, generateIDService);

    @Test
    void calculateProportionalBill_and_returnCustomExpenseCategoryModel() {
        //GIVEN
        CustomExpenseCategoryDTO customExpenseCategoryDTO = new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 2, 1, 150);
        CustomExpenseCategoryModel expected = new CustomExpenseCategoryModel("1", "Strom", UNITBASEDKEY, 2, 1, 150, 75);
        String testId = "1";
        when(generateIDService.generateCustomExpenseCategoryUUID()).thenReturn(testId);
        //WHEN
        CustomExpenseCategoryModel actual = utilityBillService.calculateProportionalBillAndCreateModel(customExpenseCategoryDTO);
        //Then
        verify(generateIDService).generateCustomExpenseCategoryUUID();
        assertEquals(expected, actual);
    }

    @Test
    void calculateProportionalBill_whenPortionIsNull_Then_returnException() {
        //GIVEN
        CustomExpenseCategoryDTO customExpenseCategoryDTO = new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 2, 0, 150);
        //WHEN & THEN
        assertThrows(ArithmeticException.class, () -> {
            utilityBillService.calculateProportionalBillAndCreateModel(customExpenseCategoryDTO);
        });
    }

    @Test
    void calculateProportionalBill_whenTotalIsNull_Then_returnException() {
        //GIVEN
        CustomExpenseCategoryDTO customExpenseCategoryDTO = new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 0, 2, 150);
        //WHEN & THEN
        assertThrows(ArithmeticException.class, () -> {
            utilityBillService.calculateProportionalBillAndCreateModel(customExpenseCategoryDTO);
        });
    }

    @Test
    void calculateProportionalBill_whenTotalBillIsNull_Then_returnException() {
        //GIVEN
        CustomExpenseCategoryDTO customExpenseCategoryDTO = new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 4, 2, 0);
        //WHEN & THEN
        assertThrows(ArithmeticException.class, () -> {
            utilityBillService.calculateProportionalBillAndCreateModel(customExpenseCategoryDTO);
        });
    }

    @Test
    void calculatePrepaymentYear() {
        //GIVEN
        double prepaymentYear = 120.10;
        double expected = 1441.2;
        //WHEN
        double actual = utilityBillService.calculatePrepaymentYear(prepaymentYear);
        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void calculateTotalCostsExpenseCategories() {
        //GIVEN
        CustomExpenseCategoryModel customExpenseCategoryModel1 = new CustomExpenseCategoryModel("1", "Strom", UNITBASEDKEY, 2, 1, 150, 75);
        CustomExpenseCategoryModel customExpenseCategoryModel2 = new CustomExpenseCategoryModel("2", "Hausmeister", UNITBASEDKEY, 2, 1, 200, 100);
        List<CustomExpenseCategoryModel> listOfCustomExpenseCategoryModels = List.of(customExpenseCategoryModel1, customExpenseCategoryModel2);
        double expected = 175;
        //WHEN
        double acutal = utilityBillService.calculateTotalCostsExpenseCategories(listOfCustomExpenseCategoryModels);
        //THEN
        assertEquals(expected, acutal);
    }

    @Test
    void calculateFinalResult() {
        //GIVEN
        double prepaymentYear = 1000;
        double totalCostsExpenseCategories = 900.50;
        double expected = -99.5;
        //WHEN
        double actual = utilityBillService.calculateFinalResult(prepaymentYear, totalCostsExpenseCategories);
        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void addUtilityBill() {
        //GIVEN
        UtilityBillDTOModel utilityBillDTOModel = new UtilityBillDTOModel(
                2022, 100, Arrays.asList(new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 3, 1, 300)));
        UtilityBillModel expected = new UtilityBillModel(
                "1", 2022, 100.0, 1200.0, 300, -900.0, Arrays.asList(new CustomExpenseCategoryModel("10", "Strom", UNITBASEDKEY, 3, 1, 1000.0, 333.33)));
        String IdForUtilityBillModel = "1";
        String IdForCustomExpenseCategoryModel = "10";
        when(generateIDService.generateCustomExpenseCategoryUUID()).thenReturn(IdForCustomExpenseCategoryModel);
        when(generateIDService.generateUtilityBillUUID()).thenReturn(IdForUtilityBillModel);
        when(utilityBillRepository.save((any()))).thenReturn(expected);
        //WHEN
        UtilityBillModel actual = utilityBillService.addUtilityBill(utilityBillDTOModel);
        //THEN
        assertEquals(expected, actual);
        verify(generateIDService).generateUtilityBillUUID();
        verify(utilityBillRepository).save((any()));
    }
}