package com.eworld.ApiGateway.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eworld.ApiGateway.beans.Role;

public interface RoleDao extends JpaRepository<Role, Integer>{
		public Role findByType(String type);

}
