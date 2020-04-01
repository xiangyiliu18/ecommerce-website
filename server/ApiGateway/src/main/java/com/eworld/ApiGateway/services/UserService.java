package com.eworld.ApiGateway.services;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.eworld.ApiGateway.beans.User;
import com.eworld.ApiGateway.beans.Role;
import com.eworld.ApiGateway.daos.UserDao;
import com.eworld.ApiGateway.daos.RoleDao;
import com.eworld.ApiGateway.https.Response;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDao roleDao;

	public Response addUser(User newUser) {
		String username = newUser.getUsername();
		// check duplicated
	    User existUser2 = userDao.findByUsername(username);
	    if(existUser2 != null) {
	    	return new Response(false, "Failed, duplicated user already exist!");
	    }else {
	    	// Add New User
	    	userDao.save(newUser);
	    	return new Response(true, "Created New User successfully with generated ID: " + newUser.getId());
	    }
}
	
	public Response findAllUsers() {
		//Response res = new Response(true, "Get All users successfuly", userDao.findAll());
		List<User> users = userDao.findAll();
		User admin = userDao.findById(10000).get();
		users.remove(admin);
		return new Response(true, "Get All users successfuly", users);
	}

	public Response findUserById(int id) {
		Optional<User> userOption= userDao.findById(id);
		if(userOption.isPresent()) {
			return new Response(true, 200, "Get User with id: " + id, userOption.get());
		}else {
			return new Response(false, "Did not find any user with id: " +id);
		}

	}
	
	public Response activeUserByID(int id) {
		Optional<User> userOption= userDao.findById(id);
		if(userOption.isPresent()) {
			 User user = userOption.get();
			    user.setActive(1);
			    user.setUpdateAt(new Date());
			    userDao.save(user);
				return new Response(true, "Active the User: '" + user.getUsername() + "' Successfully & Sent the notice emial!");
		}else {
			return new Response(false, "User with Id: '"+id+ "' does not exist!");
			}
	}
	
	public Response inactiveUserByID(int id) {
		Optional<User> userOption= userDao.findById(id);
		if(userOption.isPresent()) {
			 User user = userOption.get();
			    user.setActive(0);
			    user.setUpdateAt(new Date());
			    userDao.save(user);
				return new Response(true, "InActive the User: '" + user.getUsername() + "' Successfully!");
		}else {
			return new Response(false, "User with Id: '"+id+ "' does not exist!");
			}
	}
	
	public Response updateUserRoleById(int id, String[] roles) {
		Optional<User> userOption= userDao.findById(id);
		if(userOption.isPresent()) {
			 User user = userOption.get();
			 Set<Role> new_roles = new HashSet<>();
			 for(int i = 0; i < roles.length; i++) {
				 new_roles.add(roleDao.findByType(roles[i]));
			}
			 user.setRoles(new_roles);
			 user.setUpdateAt(new Date());
			 userDao.save(user);
			 return new Response(true, "Update Successfully!");	 
		}else {
			return new Response(false, "User with Id: '"+id+ "' does not exist!");
		}
	}
	
	
	public Response deleteUserById(int id) {
		Optional<User> user = userDao.findById(id);
		if(user.isPresent()) {
			userDao.deleteById(id);
			return new Response(true, "Delete the user with id: " + id +"Successfully!");
		}else {
			return new Response(false, "Failed to delete the user with  id: "+ id);
		}
	}
		
}
