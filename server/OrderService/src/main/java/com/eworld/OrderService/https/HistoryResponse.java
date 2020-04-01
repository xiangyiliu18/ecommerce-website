package com.eworld.OrderService.https;
import java.util.Set;

import com.eworld.OrderService.beans.OrderHistory;


public class HistoryResponse {
    private boolean success;
    private int code;
    private String message;
    private Set<OrderHistory> orderHistories;
    
    public HistoryResponse() {
        super();
    }
    
    public HistoryResponse(boolean success) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = "";
    }
    
    public HistoryResponse(boolean success, String message) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = message;
    }
    public HistoryResponse(boolean success, int code, String message) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
    }
    public HistoryResponse(boolean success, Set<OrderHistory> orderHistories) {
        super();
        this.success = success;
        this.orderHistories = orderHistories;
    }
    
    public HistoryResponse(boolean success, int code) {
        super();
        this.success = success;
        this.code = code;
    }
    
 

	public HistoryResponse(boolean success, int code, String message, Set<OrderHistory> orderHistories) {
		super();
		this.success = success;
		this.code = code;
		this.message = message;
		this.orderHistories = orderHistories;
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

	public Set<OrderHistory> getOrderHistories() {
		return orderHistories;
	}

	public void setOrderHistories(Set<OrderHistory> orderHistories) {
		this.orderHistories = orderHistories;
	}

	@Override
	public String toString() {
		return "HistoryResponse [success=" + success + ", code=" + code + ", message=" + message + ", orderHistories="
				+ orderHistories + "]";
	}




}