package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCategory {
    private String id;
    private String expenseCategory;
    private DistributionKey distributionKey;
    private int total;
    private int portion;
}
