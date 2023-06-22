package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DTOExpenseCategory {
    private String expenseCategory;
    private DistributionKey distributionKey;
    private int total;
    private int portion;
}
