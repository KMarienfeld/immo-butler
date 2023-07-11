package de.neuefische.backend.security;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ControllerUser {
    private final UserService userService;

    @GetMapping("/me")
    public String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/login")
    public void login() {
        //Diese Methode ist bewusst leer, da die getUsername Funktionalität in einer eigenen Funktion ausgelagert wurde.
    }

    @PostMapping("/logout")
    String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "logged out";
    }

    @PostMapping("/signUp")
    public UserDTO addNewUser(@Valid @RequestBody UserDTO userDTO) {
        return userService.addNewUser(userDTO);
    }

}
