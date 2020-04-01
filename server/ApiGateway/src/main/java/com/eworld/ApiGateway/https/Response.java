package com.eworld.ApiGateway.https;

import java.util.List;
import com.eworld.ApiGateway.beans.User;

public class Response {
    private boolean success;
    private int code;
    private String message;
    private User user;
    private List<User> users;
    public Response() {
        super();
    }
    
    public Response(boolean success) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = "";
        this.user = null;
        this.users = null;
    }
    
    public Response(boolean success, String message) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = message;
        this.user = null;
        this.users = null;
    }
    public Response(boolean success, int code, String message) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
        this.user = null;
        this.users = null;
    }
    
    public Response(boolean success, String message, List<User> users) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.users = users;
        this.user = null;
    }
    

	public Response(boolean success,int code, String message, User user) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
        this.user = user;
        this.users = null;
    }

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "Response [success=" + success + ", code=" + code + ", message=" + message + ", user=" + user
				+ ", users=" + users + "]";
	}
   

}