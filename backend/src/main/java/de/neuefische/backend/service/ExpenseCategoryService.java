package de.neuefische.backend.service;

import de.neuefische.backend.model.DTOExpenseCategory;
import de.neuefische.backend.model.ExpenseCategory;
import de.neuefische.backend.repository.ExpenseCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExpenseCategoryService {
    private final ExpenseCategoryRepository repositoryExpenseCategory;
    private final GenerateIDService generateIDService;

    public ExpenseCategory addExpenseCategory(DTOExpenseCategory dtoExpenseCategory) {
        ExpenseCategory newExpenseCategory = new ExpenseCategory();
        newExpenseCategory.setId(generateIDService.generateExpenseCategoryUUID());
        newExpenseCategory.setExpanseCategory(dtoExpenseCategory.getExpanseCategory());
        newExpenseCategory.setDistributionKey(dtoExpenseCategory.getDistributionKey());
        newExpenseCategory.setTotal(dtoExpenseCategory.getTotal());
        newExpenseCategory.setPortion(dtoExpenseCategory.getPortion());

        return repositoryExpenseCategory.save(newExpenseCategory);
    }

}
