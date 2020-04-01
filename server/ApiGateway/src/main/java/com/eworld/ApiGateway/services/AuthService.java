package com.eworld.ApiGateway.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.eworld.ApiGateway.daos.UserDao;
import com.eworld.ApiGateway.https.AuthenticationSuccessResponse;
import com.eworld.ApiGateway.https.Response;
@Service
public class AuthService {
    
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    UserDao employeeDao;
    public Response checkLogin(Authentication authentication) {
    	if(authentication != null) {
//    		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    		LOGGER.info(authentication.getName() + "Already Logged In!");
    	      System.out.println(authentication.getAuthorities());
    		 Response response = new AuthenticationSuccessResponse(true, 200, "Logged In!", employeeDao.findByUsername(authentication.getName()));
    		 return response;
    	}else {
    		LOGGER.info("Need to log in first!");
    		return new Response(false, 400, "Need to log in first!");
    		
    	}
    }
}

