package com.eworld.OrderService.beans;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ew_order_product")
public class OrderProduct {
	@Id
	private int id;
	@Column
	private int qty;
	
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.DETACH)
	private Order order;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.DETACH)
	private Product product;
	
	public OrderProduct() {
		super();
	}
	public OrderProduct(int id, int qty, Order order, Product product) {
		super();
		this.id = id;
		this.qty = qty;
		this.order = order;
		this.product = product;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getQty() {
		return qty;
	}
	public void setQty(int qty) {
		this.qty = qty;
	}
	
	@JsonIgnore
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	
//	@JsonIgnore
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	@Override
	public String toString() {
		return "OrderProduct [id=" + id + ", qty=" + qty + ", order=" + order + ", product=" + product + "]";
	}
	
	

}