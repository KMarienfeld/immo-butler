package de.neuefische.backend.repository;

import de.neuefische.backend.model.RealEstateModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateRepository extends MongoRepository<RealEstateModel, String> {

    @Query(value = "{ '_id' :  ?0}")
    RealEstateModel findRealEstateById(String idOfRealEstate);
    default void addUtilityBill(String idOfRealEstate, String idOfUtilityBill) {
        RealEstateModel realEstate = findRealEstateById(idOfRealEstate);
        realEstate.getUtilityBills().add(idOfUtilityBill);
        save(realEstate);
    }
}
