package de.immoButler.backend.fixAndFlip.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("calculationHouse")
public class CalculationHouse {
    private String id;
    private String name;
    private String address;
    private int livingSpace;
    private int propertySize;
    private double additionalCosts;
    private int constructionYear;
    private int residentialUnits;
    private double renovationCosts;
    private double interestCosts;
    private double otherCosts;
}
