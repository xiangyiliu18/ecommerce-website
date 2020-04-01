package com.eworld.ApiGateway.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eworld.ApiGateway.beans.User;

public interface UserDao extends JpaRepository<User, Integer>{
	public User findByUsername(String username);
		
}
