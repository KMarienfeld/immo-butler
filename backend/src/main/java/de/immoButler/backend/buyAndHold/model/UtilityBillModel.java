package de.immoButler.backend.buyAndHold.model;

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
    private double totalCostsOfAllExpenseCategories;
    private double finalResult;
    private List<CustomExpenseCategoryModel> customExpenseCategoryModel;
    private String designationOfRealEstate;
    private GenderOfTenant genderOfTenant;
    private String firstNameOfTenant;
    private String lastNameOfTenant;
    private String roadOfRealEstate;
    private String houseNumberOfRealEstate;
    private int postCodeOfRealEstate;
    private String locationOfRealEstate;
    private String associatedRealEstate;
}
