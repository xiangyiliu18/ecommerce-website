package com.eworld.ApiGateway.controllers;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eworld.ApiGateway.beans.User;
import com.eworld.ApiGateway.https.Response;
import com.eworld.ApiGateway.services.MailService;
import com.eworld.ApiGateway.services.UserService;
import com.google.gson.Gson;

@RestController
@RequestMapping("/users")
public class UserController {
	//private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
	@Autowired
	UserService userService;
	
	@Autowired
	private MailService mailService;
	
	@GetMapping
	public ResponseEntity<Response> findAllUsers() {
		return  ResponseEntity.ok().body(userService.findAllUsers());
	}
	
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Response> findUserById(@PathVariable int id) {
		return ResponseEntity.ok().body(userService.findUserById(id));
	}
	
	@PostMapping("/active/{id}")
	public ResponseEntity<Response> activeUserById(@PathVariable int id, @RequestParam boolean active) {
		// active = false
		Response res = null;
		String status = "inactive";
		if(active)
				status = "active";
		 User user = userService.findUserById(id).getUser();
		 String email = user.getEmail();
		 String subject = "EWORLD Backend System: Active Status Changes";
		 String text ="Dear " + user.getUsername() + ",  You account has been '"+status +"' for the EWORLD backend System.  If you have any questions, please contact your manager";
		
		try{
            mailService.sendEmail(email, subject, text);	
		}catch (MailException e) {
		     return ResponseEntity.ok().body(new Response(false, 400, "Email not sent.. mailexception"));
		}catch (Exception e) {
			 return ResponseEntity.ok().body(new Response(false, 400, "Email not sent.."));
		}
		if(active) {
			 res = userService.activeUserByID(id);
		}else {
			 res = userService.inactiveUserByID(id);
		}
		 return ResponseEntity.ok().body(res);
	}
	
	@PostMapping("/update_roles/{id}")
	public ResponseEntity<Response>  updateUserRoleById(@PathVariable int id, @RequestParam String roles) {
		//LOGGER.info("Update Roles: " + id);
		String[] new_roles = new Gson().fromJson(roles, String[].class);
		return ResponseEntity.ok().body(userService.updateUserRoleById(id, new_roles));
	}
	
	@PostMapping("/delete/{id}")
	public ResponseEntity<Response> deleteUserById(@PathVariable int id) {
		 return ResponseEntity.ok().body(userService.deleteUserById(id));
	}

}
