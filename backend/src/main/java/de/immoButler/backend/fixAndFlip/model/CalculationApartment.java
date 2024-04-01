package de.immoButler.backend.fixAndFlip.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("calculationApartment")
public class CalculationApartment {
    private String id;
    private String name;
    private String address;
    private int livingSpace;
    private double additionalCosts;
    private double reserves;
    private int constructionYear;
    private int residentialUnits;
    private double renovationCosts;
    private double interestCosts;
    private double otherCosts;
    private double houseMoney;
}
