package de.immoButler.backend.buyAndHold.repository;

import de.immoButler.backend.buyAndHold.model.UtilityBillModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilityBillRepository extends MongoRepository<UtilityBillModel, String> {
}
