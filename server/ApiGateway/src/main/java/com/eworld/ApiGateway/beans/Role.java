package com.eworld.ApiGateway.beans;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ew_role")
public class Role implements GrantedAuthority, Serializable{
	
	private static final long serialVersionUID = 470754351083272088L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; // serial
	@Column
	private String type;
	
	public Role() {
		super();

	}

	public Role(int id, String type) {
		super();
		this.id = id;
		this.type = type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
   
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Role [id=" + id + ", type=" + type + "]";
	}
    
	@JsonIgnore
	@Override
	public String getAuthority() {
		return type;
	}

}
