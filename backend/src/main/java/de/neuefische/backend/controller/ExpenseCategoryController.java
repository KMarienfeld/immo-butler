package de.neuefische.backend.controller;

import de.neuefische.backend.model.DTOExpenseCategory;
import de.neuefische.backend.model.ExpenseCategory;
import de.neuefische.backend.service.ExpenseCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/expenseCategory")
@RequiredArgsConstructor
public class ExpenseCategoryController {

    private final ExpenseCategoryService expenseCategoryService;
    @PostMapping("/add")
    public ExpenseCategory addExpenseCategory (@RequestBody DTOExpenseCategory dtoExpenseCategory) {
        return expenseCategoryService.addExpenseCategory(dtoExpenseCategory);
    }
}
