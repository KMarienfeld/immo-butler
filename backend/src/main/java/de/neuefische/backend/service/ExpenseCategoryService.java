package de.neuefische.backend.service;

import de.neuefische.backend.model.DTOExpenseCategory;
import de.neuefische.backend.model.ExpenseCategory;
import de.neuefische.backend.repository.ExpenseCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseCategoryService {
    private final ExpenseCategoryRepository expenseCategoryRepository;
    private final GenerateIDService generateIDService;

    public ExpenseCategory addExpenseCategory(DTOExpenseCategory dtoExpenseCategory) {
        ExpenseCategory newExpenseCategory = new ExpenseCategory();
        newExpenseCategory.setId(generateIDService.generateExpenseCategoryUUID());
        newExpenseCategory.setExpanseCategory(dtoExpenseCategory.getExpanseCategory());
        newExpenseCategory.setDistributionKey(dtoExpenseCategory.getDistributionKey());
        newExpenseCategory.setTotal(dtoExpenseCategory.getTotal());
        newExpenseCategory.setPortion(dtoExpenseCategory.getPortion());

        return expenseCategoryRepository.save(newExpenseCategory);
    }

    public List<ExpenseCategory> getAllExpenseCategories() {
        return expenseCategoryRepository.findAll();
    }

    public ExpenseCategory editExpenseCategoryById(String idOfExpenseCategory, DTOExpenseCategory dtoExpenseCategory) {
        ExpenseCategory editedExpenseCategory = new ExpenseCategory(idOfExpenseCategory, dtoExpenseCategory.getExpanseCategory(), dtoExpenseCategory.getDistributionKey(), dtoExpenseCategory.getTotal(), dtoExpenseCategory.getPortion());
        return expenseCategoryRepository.save(editedExpenseCategory);
    }
}
