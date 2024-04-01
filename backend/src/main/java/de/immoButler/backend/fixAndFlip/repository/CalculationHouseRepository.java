package de.immoButler.backend.fixAndFlip.repository;

import de.immoButler.backend.fixAndFlip.model.CalculationHouse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalculationHouseRepository extends MongoRepository<CalculationHouse, String> {
}
