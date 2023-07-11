package de.neuefische.backend.security;
import de.neuefische.backend.service.GenerateIDService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;
    private final GenerateIDService generateIDService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserModel userModel = userRepo.findUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with Mail Adress" + email + " not found"));
        return new User(userModel.getEmail(), userModel.getPassword(), List.of());
    }

    public UserDTO addNewUser(UserDTO userDTO) {
        if (userRepo.findUserByEmail(userDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email adress already exists");
        }
        UserModel userModel = new UserModel();
        userModel.setId(generateIDService.generateUserUUID());
        userModel.setFirstname(userDTO.getFirstname());
        userModel.setLastname(userDTO.getLastname());
        userModel.setEmail(userDTO.getEmail());
        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());
        userModel.setPassword(hashedPassword);
        userRepo.save(userModel);
        return userDTO;
    }
}
