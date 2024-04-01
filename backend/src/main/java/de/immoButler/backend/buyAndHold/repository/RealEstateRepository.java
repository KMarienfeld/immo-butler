package de.immoButler.backend.buyAndHold.repository;

import de.immoButler.backend.buyAndHold.model.RealEstateModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;

@Repository
public interface RealEstateRepository extends MongoRepository<RealEstateModel, String> {

    @Query(value = "{ '_id' :  ?0}")
    RealEstateModel findRealEstateById(String idOfRealEstate);
    default void addUtilityBill(String idOfRealEstate, String idOfUtilityBill) {
        RealEstateModel realEstate = findRealEstateById(idOfRealEstate);
        if (realEstate.getUtilityBills() == null) {
            realEstate.setUtilityBills(new ArrayList<>());
        }
        realEstate.getUtilityBills().add(idOfUtilityBill);
        save(realEstate);
    }

    default void removeUtilityBill(String idOfUtilityBill, String idOfRealEstate) {
        RealEstateModel realEstate = findRealEstateById(idOfRealEstate);
        if (realEstate != null && realEstate.getUtilityBills() != null) {
            realEstate.getUtilityBills().remove(idOfUtilityBill);
            save(realEstate);
        }
    }
}
