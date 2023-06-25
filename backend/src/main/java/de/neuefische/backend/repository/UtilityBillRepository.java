package de.neuefische.backend.repository;

import de.neuefische.backend.model.UtilityBillModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilityBillRepository extends MongoRepository<UtilityBillModel, String> {
}
