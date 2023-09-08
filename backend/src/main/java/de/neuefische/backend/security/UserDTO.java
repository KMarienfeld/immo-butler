package de.neuefische.backend.security;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    @NotEmpty
    @Pattern(regexp = "^[a-zA-Z]+$")
    private String firstname;
    @NotEmpty
    @Pattern(regexp = "^[a-zA-Z]+$")
    private String lastname;
    @NotEmpty
    @Email
    private String email;
    @NotEmpty
    @Size(min = 8)
    private String password;
}

