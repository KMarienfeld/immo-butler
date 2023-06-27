package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("utilityBill")
public class UtilityBillModel {
    private String id;
    private int year;
    private double prepaymentMonthly;
    private double prepaymentYear;
    private double finalResult;
    private List<CustomExpenseCategoryModel> customExpenseCategoryModel;
}
