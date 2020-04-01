package com.eworld.OrderService.https;

import java.util.List;
import com.eworld.OrderService.beans.Order;

public class Response {
    private boolean success;
    private int code;
    private String message;
    private Order order;
    private List<Order> orders;
    public Response() {
        super();
    }
    
    public Response(boolean success) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = "";
        this.order = null;
        this.orders = null;
    }
    
    public Response(boolean success, String message) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = message;
        this.order = null;
        this.orders = null;
    }
    public Response(boolean success, int code, String message) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
        this.order = null;
        this.orders = null;
    }
    
    public Response(boolean success, String message, List<Order> orders) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.orders = orders;
        this.order = null;
    }
    

	public Response(boolean success,int code, String message, Order order) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
        this.order = order;
        this.orders = null;
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

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	@Override
	public String toString() {
		return "Response [success=" + success + ", code=" + code + ", message=" + message + ", order=" + order
				+ ", orders=" + orders + "]";
	}

	
}