package de.neuefische.backend.repository;

import de.neuefische.backend.model.RealEstateModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateRepository extends MongoRepository<RealEstateModel, String> {

}
