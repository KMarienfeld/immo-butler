package de.neuefische.backend.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("user")
public class UserModel {

    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;


}
