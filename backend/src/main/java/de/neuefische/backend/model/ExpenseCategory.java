package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("ExpenseCategory")
public class ExpenseCategory {
    private String id;
    private String expanseCategory;
    private DistributionKey distributionKey;
    private int total;
    private int portion;
}
