package de.neuefische.backend.controller;

import de.neuefische.backend.model.DTOExpenseCategory;
import de.neuefische.backend.model.ExpenseCategory;
import de.neuefische.backend.service.ExpenseCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/expenseCategory")
@RequiredArgsConstructor
public class ExpenseCategoryController {

    private final ExpenseCategoryService expenseCategoryService;
    @PostMapping("/add")
    public ExpenseCategory addExpenseCategory (@RequestBody DTOExpenseCategory dtoExpenseCategory) {
        return expenseCategoryService.addExpenseCategory(dtoExpenseCategory);
    }

    @GetMapping("/get-all")
    public List<ExpenseCategory> getAllExpenseCategories () {
        return expenseCategoryService.getAllExpenseCategories();
    }

    @PutMapping("/edit/{id}")
    public ExpenseCategory editExpenseCategory(@PathVariable String id, @RequestBody DTOExpenseCategory dtoExpenseCategory) {
        return expenseCategoryService.editExpenseCategoryById(id, dtoExpenseCategory);
    }

    @DeleteMapping("/delete/")
    public void deleteExpenseCategory(@PathVariable String id) {
        return expenseCategoryService.deleteExpenseCategory(id);
    }
}
