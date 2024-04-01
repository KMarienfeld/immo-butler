package de.immoButler.backend.service;

import de.immoButler.backend.buyAndHold.repository.RealEstateRepository;
import de.immoButler.backend.buyAndHold.repository.UtilityBillRepository;
import de.immoButler.backend.buyAndHold.service.GenerateIDService;
import de.immoButler.backend.buyAndHold.service.UtilityBillService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class UtilityBillServiceTest {

    private final UtilityBillRepository utilityBillRepository = mock(UtilityBillRepository.class);
    private final GenerateIDService generateIDService = mock(GenerateIDService.class);
    private final RealEstateRepository realEstateRepository = mock(RealEstateRepository.class);
    private final UtilityBillService utilityBillService = new UtilityBillService(utilityBillRepository, generateIDService, realEstateRepository);

   /* @Test
    void calculateProportionalBill_and_returnCustomExpenseCategoryModel() {
        //GIVEN
        CustomExpenseCategoryDTO customExpenseCategoryDTO = new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 2, 1, 150);
        CustomExpenseCategoryModel expected = new CustomExpenseCategoryModel("1", "Strom", UNITBASEDKEY, 2, 1, 150, 75);
        String testId = "1";
        when(generateIDService.generateCustomExpenseCategoryUUID()).thenReturn(testId);
        //WHEN
        CustomExpenseCategoryModel actual = utilityBillService.createCustomExpenseCategoryModel(customExpenseCategoryDTO);
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
            utilityBillService.createCustomExpenseCategoryModel(customExpenseCategoryDTO);
        });
    }

    @Test
    void calculateProportionalBill_whenTotalIsNull_Then_returnException() {
        //GIVEN
        CustomExpenseCategoryDTO customExpenseCategoryDTO = new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 0, 2, 150);
        //WHEN & THEN
        assertThrows(ArithmeticException.class, () -> {
            utilityBillService.createCustomExpenseCategoryModel(customExpenseCategoryDTO);
        });
    }

    @Test
    void calculateProportionalBill_whenTotalBillIsNull_Then_returnException() {
        //GIVEN
        CustomExpenseCategoryDTO customExpenseCategoryDTO = new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 4, 2, 0);
        //WHEN & THEN
        assertThrows(ArithmeticException.class, () -> {
            utilityBillService.createCustomExpenseCategoryModel(customExpenseCategoryDTO);
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
                2022, 100, Arrays.asList(new CustomExpenseCategoryDTO("Strom", UNITBASEDKEY, 3, 1, 300)), "Musterimmobilie", MALE, "Max", "Mustermann", "Teststr", "32", 77765, "Musterstadt", "Musterimmobilie");
        UtilityBillModel expected = new UtilityBillModel(
                "1", 2022, 100.0, 1200.0, 300, -900.0, Arrays.asList(new CustomExpenseCategoryModel("10", "Strom", UNITBASEDKEY, 3, 1, 1000.0, 333.33)), "Musterimmobilie", MALE, "Max", "Mustermann", "Teststr", "32", 77765, "Musterstadt");
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

    @Test
    void getAllUtilityBills() throws Exception {
        //GIVEN
        UtilityBillModel utilityBillModel1 = new UtilityBillModel("1", 2022, 100.0, 1200.0, 800.0, -300.0, Arrays.asList(new CustomExpenseCategoryModel("10", "Strom", UNITBASEDKEY, 3, 1, 300, 100)), "Musterimmobilie", MALE, "Max", "Mustermann", "Teststr", "32", 77765, "Musterstadt");
        when(utilityBillRepository.findAll()).thenReturn(List.of(utilityBillModel1));
        //WHEN
        List<UtilityBillModel> actual = utilityBillService.getAllUtilityBills();
        //THEN
        verify(utilityBillRepository).findAll();
        assertEquals(actual, List.of(utilityBillModel1));
    }

    @Test
    void deleteUtilityBillById() throws Exception {
        //GIVEN
        UtilityBillModel expected = new UtilityBillModel("11", 2023, 50.0, 600.0, 116.67, -483.33, Arrays.asList(new CustomExpenseCategoryModel("22", "Hausmeister", UNITBASEDKEY, 3, 1, 350.0, 116.67)), "Musterimmobilie", MALE, "Max", "Mustermann", "Teststr", "32", 77765, "Musterstadt");
        String testId = "11";
        when(utilityBillRepository.findById(testId)).thenReturn(Optional.of(expected));
        //WHEN
        UtilityBillModel actual = utilityBillService.deleteUtilityBillById(testId);
        //THEN
        verify(utilityBillRepository).findById(testId);
        verify(utilityBillRepository).deleteById(testId);
        assertEquals(actual, expected);
    }

    @Test
    void when_deleteUtilityBillByIdWithWrongID_then_throwException() {
        //GIVEN
        String wrongId = "wrongID";
        when(utilityBillRepository.findById(wrongId)).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(RuntimeException.class, () -> {
            utilityBillService.deleteUtilityBillById(wrongId);
        });
    }

    @Test
    void when_findByID_then_returnUtilityBillModel() {
        //GIVEN
        String testId = "10";
        UtilityBillModel expected = new UtilityBillModel("10", 2022, 100.0, 1200.0, 800.0, -300.0, Arrays.asList(new CustomExpenseCategoryModel("10", "Strom", UNITBASEDKEY, 3, 1, 300, 100)), "Musterimmobilie", MALE, "Max", "Mustermann", "Teststr", "32", 77765, "Musterstadt");
        when(utilityBillRepository.findById(testId)).thenReturn(Optional.of(expected));
        //WHEN
        UtilityBillModel actual = utilityBillService.findById(testId);
        //THEN
        verify(utilityBillRepository).findById(testId);
        assertEquals(actual, expected);
    }

    @Test
    void when_findByIdWithWrongID_then_throwException() {
        //GIVEN
        String wrongId = "10";
        when(utilityBillRepository.findById(wrongId)).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(RuntimeException.class, () -> {
            utilityBillService.findById(wrongId);
        });
    }*/
}