package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UtilityBillDTOModel {
    private int year;
    private double prepaymentMonthly;
    private List<CustomExpenseCategoryDTO> customExpenseCategoryDTO;
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
