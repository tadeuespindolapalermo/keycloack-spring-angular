package com.tutorial.keycloackbackend.controller;

import com.tutorial.keycloackbackend.dto.ResponseMessage;
import com.tutorial.keycloackbackend.model.User;
import com.tutorial.keycloackbackend.service.KeycloakService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    private final KeycloakService keycloakService;

    public UserController(KeycloakService keycloakService) {
        this.keycloakService = keycloakService;
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseMessage> create(@RequestBody User user) {
        Object[] obj = keycloakService.createUser(user);
        int status = (int) obj[0];
        ResponseMessage message = (ResponseMessage) obj[1];
        return ResponseEntity.status(status).body(message);
    }


}
