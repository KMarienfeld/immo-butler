package de.neuefische.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class ControllerUser {

    @GetMapping ("/me")
    public String getUserName() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping ("/login")
    public void login() {

    }
}
