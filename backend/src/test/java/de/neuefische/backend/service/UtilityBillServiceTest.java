package de.neuefische.backend.service;

import de.neuefische.backend.model.CustomExpenseCategoryDTO;
import de.neuefische.backend.model.CustomExpenseCategoryModel;
import de.neuefische.backend.repository.UtilityBillRepository;
import org.junit.jupiter.api.Test;

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

        //WHEN

        //THEN

    }

    @Test
    void calculateTotalCostsExpenseCategories() {
    }

    @Test
    void calculateFinalResult() {
    }

    @Test
    void addUtilityBill() {
    }
}