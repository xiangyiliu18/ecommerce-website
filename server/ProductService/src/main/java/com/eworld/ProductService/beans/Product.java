package com.eworld.ProductService.beans;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="ew_product")
public class Product{

	@Id
	private int id;  //numeric(11) -- primary key
	@Column
	private String name;
	@Column
	private String brand; 
	@Column
	private double price; 
	@Column
	private String image;
	@Column
	private int stock;
	@Column
	private String description;
	@Column
	private short status;
	@Column 
	private int sell;
	
	@Column
	private Date create_timestamp;
	
	@Column
	private Date update_timestamp;
	
	@ManyToMany(fetch=FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinTable(
			// name define the join table name
		name = "ew_product_category",
		// join columns define how the "join table" join with current table
		joinColumns = {
				@JoinColumn(name = "product_id", referencedColumnName = "id")
		},
		// inverseJoincolumns define how the "join table" join with another table
		inverseJoinColumns = {
				@JoinColumn(name = "category_id", referencedColumnName= "id")
		}
	)
	private Set<Category> categories;

	public Product() {
		super();
	}


	public Product(int id, String name, String brand, double price, String image, int stock, String description,
			short status, int sell, Date create_timestamp, Date update_timestamp, Set<Category> categories) {
		super();
		this.id = id;
		this.name = name;
		this.brand = brand;
		this.price = price;
		this.image = image;
		this.stock = stock;
		this.description = description;
		this.status = status;
		this.sell = sell;
		this.create_timestamp = create_timestamp;
		this.update_timestamp = update_timestamp;
		this.categories = categories;
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public short getStatus() {
		return status;
	}

	public void setStatus(short status) {
		this.status = status;
	}

	public Date getCreate_timestamp() {
		return create_timestamp;
	}

	public void setCreate_timestamp(Date create_timestamp) {
		this.create_timestamp = create_timestamp;
	}

	public Date getUpdate_timestamp() {
		return update_timestamp;
	}

	public void setUpdate_timestamp(Date update_timestamp) {
		this.update_timestamp = update_timestamp;
	}
    
	@JsonIgnore
	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}
	
	
	public int getSell() {
		return sell;
	}

	public void setSell(int sell) {
		this.sell = sell;
	}


	@Override
	public String toString() {
		return "Product [id=" + id + ", name=" + name + ", brand=" + brand + ", price=" + price + ", image=" + image
				+ ", stock=" + stock + ", description=" + description + ", status=" + status + ", sell=" + sell
				+ ", create_timestamp=" + create_timestamp + ", update_timestamp=" + update_timestamp + ", categories="
				+ categories + "]";
	}
	

}
