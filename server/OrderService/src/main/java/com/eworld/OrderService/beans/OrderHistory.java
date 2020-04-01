package com.eworld.OrderService.beans;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ew_order_history")
public class OrderHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private int status;
	
	@Column(name="operation_date")
	private Date operationDate;
	
	@Column(name="operation_username")
	private String operationUsername;
	
	@Column
	private String comment;
	
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.DETACH)
	private Order order;
	

	public OrderHistory() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public OrderHistory(int id, int status, Date operationDate, String operationUsername, String comment,
			Order order) {
		super();
		this.id = id;
		this.status = status;
		this.operationDate = operationDate;
		this.operationUsername = operationUsername;
		this.comment = comment;
		this.order = order;
	}



	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	
	
	@JsonIgnore
	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
	
	

	public Date getOperationDate() {
		return operationDate;
	}


	public void setOperationDate(Date operationDate) {
		this.operationDate = operationDate;
	}



	public String getOperationUsername() {
		return operationUsername;
	}



	public void setOperationUsername(String operationUsername) {
		this.operationUsername = operationUsername;
	}



	public String getComment() {
		return comment;
	}



	public void setComment(String comment) {
		this.comment = comment;
	}



	@Override
	public String toString() {
		return "OrderHistory [id=" + id + ", status=" + status + ", operation_date=" + operationDate
				+ ", operation_username=" + operationUsername + ", order=" + order + "]";
	}

	
	
	
	

}
