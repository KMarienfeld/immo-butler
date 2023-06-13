package de.neuefische.backend.repository;

import de.neuefische.backend.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<UserModel, String> {

    Optional<UserModel> findUserByUsername(String username);
}
