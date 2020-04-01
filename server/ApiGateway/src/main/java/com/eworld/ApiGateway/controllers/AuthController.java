package com.eworld.ApiGateway.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eworld.ApiGateway.https.Response;
import com.eworld.ApiGateway.services.AuthService;

@RestController
public class AuthController {
	
	@Autowired
	AuthService authService;
	

	@GetMapping("/checklogin")
	public Response checklogin(Authentication authentication) {
		return authService.checkLogin(authentication);
	}

	
}
