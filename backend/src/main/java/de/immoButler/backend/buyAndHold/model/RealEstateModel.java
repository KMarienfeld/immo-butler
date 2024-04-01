package de.immoButler.backend.buyAndHold.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("realEstate")
public class RealEstateModel {
    private String id;
    private String designationOfRealEstate;
    private String roadOfRealEstate;
    private String houseNumberOfRealEstate;
    private int postCodeOfRealEstate;
    private String locationOfRealEstate;
    private GenderOfTenant genderOfTenant;
    private String firstNameOfTenant;
    private String lastNameOfTenant;
    private List<ExpenseCategory> listOfExpenseCategories;
    private List<String> utilityBills;
}
