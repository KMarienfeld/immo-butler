package de.neuefische.backend.service;

import de.neuefische.backend.model.DTOExpenseCategory;
import de.neuefische.backend.model.ExpenseCategory;
import de.neuefische.backend.repository.ExpenseCategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

import static de.neuefische.backend.model.DistributionKey.UNITBASEDKEY;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ExpenseCategoryServiceTest {
    private final ExpenseCategoryRepository expenseCategoryRepository = mock(ExpenseCategoryRepository.class);
    private final GenerateIDService generateIDService = mock(GenerateIDService.class);
    private final ExpenseCategoryService expenseCategoryService = new ExpenseCategoryService(expenseCategoryRepository, generateIDService);

    @Test
    void when_addExpenseCategoryDTO_then_returnNewExpenseCategory() {
        //GIVEN
        DTOExpenseCategory dtoExpenseCategory = new DTOExpenseCategory("Strom", UNITBASEDKEY, 2, 1);
        String testID = "testID123";
        when(generateIDService.generateExpenseCategoryUUID()).thenReturn(testID);
        ExpenseCategory expected = new ExpenseCategory(testID, dtoExpenseCategory.getExpenseCategory(), dtoExpenseCategory.getDistributionKey(), dtoExpenseCategory.getTotal(), dtoExpenseCategory.getPortion());
        when(expenseCategoryRepository.save(any())).thenReturn(expected);
        //WHEN
        ExpenseCategory actual = expenseCategoryService.addExpenseCategory(dtoExpenseCategory);
        //THEN
        verify(generateIDService).generateExpenseCategoryUUID();
        verify(expenseCategoryRepository).save((any()));
        assertEquals(expected, actual);
    }

    @Test
    @DirtiesContext
    void when_getAllExpenseCategories_then_returnAllExpenseCategories() throws Exception {
       //GIVEN
       ExpenseCategory expenseCategory1 = new ExpenseCategory("123", "Strom", UNITBASEDKEY, 2, 1);
       when(expenseCategoryRepository.findAll()).thenReturn(List.of(expenseCategory1));
       //WHEN
       List<ExpenseCategory> actual = expenseCategoryService.getAllExpenseCategories();
       //THEN
       verify(expenseCategoryRepository).findAll();
       assertEquals(actual, List.of(expenseCategory1));
    }

    @Test
    void when_editExpenseService_then_ReturnEditedExpenseService() throws Exception {
        //GIVEN
        DTOExpenseCategory newDtoExpenseCategory = new DTOExpenseCategory("Strom", UNITBASEDKEY, 3, 1);
        String testID = "123";
        ExpenseCategory oldExpenseCategory = new ExpenseCategory("123","Strom", UNITBASEDKEY, 2, 1);
        ExpenseCategory expectedExpenseCategory = new ExpenseCategory("123","Strom", UNITBASEDKEY, 3, 1);
        when(expenseCategoryRepository.findById(testID)).thenReturn(Optional.of(oldExpenseCategory));
        when(expenseCategoryRepository.save(expectedExpenseCategory)).thenReturn(expectedExpenseCategory);
        //WHEN
        ExpenseCategory actual = expenseCategoryService.editExpenseCategoryById(testID, newDtoExpenseCategory);
        //THEN
        verify(expenseCategoryRepository).findById(testID);
        verify(expenseCategoryRepository).save(expectedExpenseCategory);
        assertEquals(actual, expectedExpenseCategory);
    }

    @Test
    void when_editExpenseService_withWrongID_then_throwException() {
        //GIVEN
        String wrongId = "wrongID";
        DTOExpenseCategory dtoExpenseCategory = new DTOExpenseCategory("Strom", UNITBASEDKEY, 3, 1);
        when(expenseCategoryRepository.findById(wrongId)).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(RuntimeException.class, () ->{
            expenseCategoryService.editExpenseCategoryById(wrongId, dtoExpenseCategory);
        });
    }
    @Test
    void when_deleteExpenseService_then_deleteById() throws Exception {
        //GIVEN
        DTOExpenseCategory expenseCategoryDTO = new DTOExpenseCategory("Strom", UNITBASEDKEY, 3, 1);
        String testID = "123";
        ExpenseCategory expectedExpenseCategory = new ExpenseCategory("123","Strom", UNITBASEDKEY, 3, 1);
        when(expenseCategoryRepository.findById(testID)).thenReturn(Optional.of(expectedExpenseCategory));
        //WHEN
        ExpenseCategory actualExpenseCategory = expenseCategoryService.deleteExpenseCategory(testID);
        //THEN
        verify(expenseCategoryRepository).findById(testID);
        verify(expenseCategoryRepository).deleteById(testID);
        assertEquals(actualExpenseCategory, expectedExpenseCategory);
    }

    @Test
    void when_deleteExpenseService_withWrongID_then_throwException() {
        //GIVEN
        String wrongId = "wrongID";
        when(expenseCategoryRepository.findById(wrongId)).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(RuntimeException.class, () ->{
            expenseCategoryService.deleteExpenseCategory(wrongId);
        });
        verify(expenseCategoryRepository).findById(wrongId);
        verify(expenseCategoryRepository, never()).deleteById(wrongId);
    }
}