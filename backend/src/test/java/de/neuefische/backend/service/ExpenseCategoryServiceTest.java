package de.neuefische.backend.service;

import de.neuefische.backend.model.DTOExpenseCategory;
import de.neuefische.backend.model.ExpenseCategory;
import de.neuefische.backend.repository.ExpenseCategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;

import static de.neuefische.backend.model.DistributionKey.UNITBASEDKEY;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ExpenseCategoryServiceTest {
    private final ExpenseCategoryRepository expenseCategoryRepository = mock(ExpenseCategoryRepository.class);
    private final GenerateIDService generateIDService = mock(GenerateIDService.class);
    private final ExpenseCategoryService expenseCategoryService = new ExpenseCategoryService(expenseCategoryRepository, generateIDService);

    @WithMockUser(username = "user", password = "123")
    @DirtiesContext
    @Test
    void when_addExpenseCategoryDTO_then_returnReturnNewExpenseCategory() {
        //GIVEN
        DTOExpenseCategory dtoExpenseCategory = new DTOExpenseCategory("Strom", UNITBASEDKEY, 2, 1);
        String testID = "testID123";
        when(generateIDService.generateExpenseCategoryUUID()).thenReturn(testID);
        ExpenseCategory expected = new ExpenseCategory(testID, dtoExpenseCategory.getExpanseCategory(), dtoExpenseCategory.getDistributionKey(), dtoExpenseCategory.getTotal(), dtoExpenseCategory.getPortion());
        when(expenseCategoryRepository.save(any())).thenReturn(expected);
        //WHEN
        ExpenseCategory actual = expenseCategoryService.addExpenseCategory(dtoExpenseCategory);
        //THEN
        verify(generateIDService).generateExpenseCategoryUUID();
        verify(expenseCategoryRepository).save((any()));
        assertEquals(expected, actual);
    }
}