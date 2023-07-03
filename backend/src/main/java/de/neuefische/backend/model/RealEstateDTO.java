package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RealEstateDTO {
    private String designationOfRealEstate;
    private String roadOfRealEstate;
    private String houseNumberOfRealEstate;
    private int postCodeOfRealEstate;
    private String locationOfRealEstate;
    private GenderOfTenant genderOfTenant;
    private String firstNameOfTenant;
    private String lastNameOfTenant;
}
