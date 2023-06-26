package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomExpenseCategoryDTO {
    private String expenseCategory;
    private DistributionKey distributionKey;
    private int total;
    private int portion;
    private double totalBill;
}
