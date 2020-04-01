package com.eworld.ProductService.https;


public class TempProduct {
	private int id;  //numeric(11) -- primary key
	private String name;
	private String brand; 
	private double price; 
	private int stock;
	private short status;
	private int sell;
	
	public TempProduct() {
		super();
	}

	public TempProduct(int id, String name, String brand, double price, int stock, short status, int sell) {
		super();
		this.id = id;
		this.name = name;
		this.brand = brand;
		this.price = price;
		this.stock = stock;
		this.status = status;
		this.sell = sell;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public short getStatus() {
		return status;
	}

	public void setStatus(short status) {
		this.status = status;
	}

	public int getSell() {
		return sell;
	}

	public void setSell(int sell) {
		this.sell = sell;
	}

	@Override
	public String toString() {
		return "TempProduct [id=" + id + ", name=" + name + ", brand=" + brand + ", price=" + price + ", stock=" + stock
				+ ", status=" + status + ", sell=" + sell + "]";
	}
	
	
	
	
	
	
}
