package com.eworld.OrderService.beans;

import java.util.Date;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ew_order")
public class Order{
	
	@Id
	private int id;
	@Column
	private Date date;
	@Column
	private String receiver;
	@Column
	private String phone;
	@Column
	private int total;
	@Column
	private int subtotal;
	@Column
	private double tax;
	@Column(name="shipping_address")
	private String shippingAddress;
	@Column(name="billing_address")
	private String billingAddress;
	@Column(name="payment_method")
	private String paymentMethod;
	@Column(name="shipping_way")
	private String shippingWay;
	@Column(name="shipping_fee")
	private int shippingFee;
	@Column
	private int status;
	
	@ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.DETACH)
	private Customer customer;
	
	
	@OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL, mappedBy="order")
	private Set<OrderProduct> purchases;
	
	@OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL, mappedBy="order")
	private Set<OrderHistory> histories;

	public Order() {
		super();
	}



	public Order(int id, Date date, String receiver, String phone, int total, int subtotal, double tax,
			String shippingAddress, String billingAddress, String paymentMethod, String shippingWay, int shippingFee,
			int status, Customer customer, Set<OrderProduct> purchases, Set<OrderHistory> histories) {
		super();
		this.id = id;
		this.date = date;
		this.receiver = receiver;
		this.phone = phone;
		this.total = total;
		this.subtotal = subtotal;
		this.tax = tax;
		this.shippingAddress = shippingAddress;
		this.billingAddress = billingAddress;
		this.paymentMethod = paymentMethod;
		this.shippingWay = shippingWay;
		this.shippingFee = shippingFee;
		this.status = status;
		this.customer = customer;
		this.purchases = purchases;
		this.histories = histories;
	}




	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReciver(String receiver) {
		this.receiver = receiver;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	

	public String getShippingAddress() {
		return shippingAddress;
	}

	public void setShippingAddress(String shippingAddress) {
		this.shippingAddress = shippingAddress;
	}

	public String getBillingAddress() {
		return billingAddress;
	}

	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public String getShippingWay() {
		return shippingWay;
	}

	public void setShippingWay(String shippingWay) {
		this.shippingWay = shippingWay;
	}

	public int getShippingFee() {
		return shippingFee;
	}

	public void setShippingFee(int shippingFee) {
		this.shippingFee = shippingFee;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
    
	public Customer getCustomer() {
		return customer;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(int subtotal) {
		this.subtotal = subtotal;
	}

	public double getTax() {
		return tax;
	}

	public void setTax(double tax) {
		this.tax = tax;
	}
	
//	@JsonIgnore
	public Set<OrderProduct> getPurchases() {
		return purchases;
	}

	
	public void setPurchases(Set<OrderProduct> purchases) {
		this.purchases = purchases;
	}

	

//	@JsonIgnore
	public Set<OrderHistory> getHistories() {
		return histories;
	}

	public void setHistories(Set<OrderHistory> histories) {
		this.histories = histories;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", date=" + date + ", reciver=" + receiver + ", phone=" + phone + ", total=" + total
				+ ", subtotal=" + subtotal + ", tax=" + tax + ", shippingAddress=" + shippingAddress
				+ ", billingAddress=" + billingAddress + ", paymentMethod=" + paymentMethod + ", shippingWay="
				+ shippingWay + ", shippingFee=" + shippingFee + ", status=" + status + ", customer=" + customer
				+ ", purchases=" + purchases + ", histories=" + histories + "]";
	}




	
	

}
