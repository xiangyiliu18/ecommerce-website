package com.eworld.ApiGateway.https;

import com.eworld.ApiGateway.beans.User;

public class AuthenticationSuccessResponse extends Response {

	private User user;

	public AuthenticationSuccessResponse(boolean success, int code, String message, User user) {
		super(success, code, message, user);
		this.user = user;
	}

	public User getUser() {
		return user;
	}

	public void setuser(User user) {
		this.user = user;
	}

}