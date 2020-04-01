package com.eworld.ApiGateway.beans;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ew_user")
public class User implements UserDetails, Serializable{

	private static final long serialVersionUID = 1611229208325618511L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; //numeric(11) -- primary key
	@Column(nullable=false,unique=true) // not null & unique
	private String username;
	@Column(nullable=false) // not null only
	private String password;
	@Column(nullable=false) 
	private String lastname;
	@Column(nullable=false)
	private String firstname;
	@Column(nullable=false)
	private String email; // -- not null
	@Column(nullable=true)
	private String phone; //varing(11) -- not null
	@Column(nullable=true)
	private int active; //numeric(1) -- default is 0
	@Column(name="create_timestamp")
	private Date createAt;
	@Column(name="update_timestamp")
	private Date updateAt;
	
	@ManyToMany(fetch=FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinTable(
			// name define the join table name
		name = "ew_user_role",
		// join columns define how the "join table" join with current table
		joinColumns = {
				@JoinColumn(name = "employee_id", referencedColumnName = "id")
		},
		// inverseJoincolumns define how the "join table" join with another table
		inverseJoinColumns = {
				@JoinColumn(name = "role_id", referencedColumnName= "id")
		}
	)
	
	private Set<Role> roles;


	public User() {
		super();
	}
	

	public User(int id, String username, String password, String lastname, String firstname, String email, String phone,
			int active, Date createAt, Date updateAt, Set<Role> roles) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.lastname = lastname;
		this.firstname = firstname;
		this.email = email;
		this.phone = phone;
		this.active = active;
		this.createAt = createAt;
		this.updateAt = updateAt;
		this.roles = roles;
	}

	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}

     
	@JsonIgnore
	public String getPassword() { // ignore when retrieve
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getLastname() {
		return lastname;
	}


	public void setLastname(String lastname) {
		this.lastname = lastname;
	}


	public String getFirstname() {
		return firstname;
	}


	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public int getActive() {
		return active;
	}


	public void setActive(int active) {
		this.active = active;
	}


	public Date getCreateAt() {
		return createAt;
	}


	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}


	public Date getUpdateAt() {
		return updateAt;
	}


	public void setUpdateAt(Date updateAt) {
		this.updateAt = updateAt;
	}


	public Set<Role> getRoles() {
		return roles;
	}


	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
				return roles;		
	}
	
	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@JsonIgnore
	@Override
	public boolean isEnabled() {
		return true;
	}


}
