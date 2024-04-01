package de.immoButler.backend.fixAndFlip.repository;

import de.immoButler.backend.fixAndFlip.model.CalculationApartment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalculatorApartmentRepository extends MongoRepository<CalculationApartment, String> {

}
