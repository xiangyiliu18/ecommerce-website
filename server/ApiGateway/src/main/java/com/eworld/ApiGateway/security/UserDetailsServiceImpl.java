package com.eworld.ApiGateway.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eworld.ApiGateway.beans.User;
import com.eworld.ApiGateway.daos.UserDao;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if(username == null) {
			throw new UsernameNotFoundException("Username: " + username + " not found");
		}else {
		User user = userDao.findByUsername(username);
		if(user == null || user.getActive() == 0) {
			throw new UsernameNotFoundException("Username: " + username + " not found");
		}else{
				return user;
		}
	}
 }
}