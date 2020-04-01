package com.eworld.ProductService.https;
import java.util.List;
import java.util.Set;

import com.eworld.ProductService.beans.Category;
import com.eworld.ProductService.beans.Product;


public class ProductResponse {
    private boolean success;
    private int code;
    private String message;
    private Product product;
    private Set<Category> categories;
    private List<TempProduct> products;
    public ProductResponse() {
        super();
    }
    
    public ProductResponse(boolean success) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = "";
    }
    
    public ProductResponse(boolean success, String message) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = message;
    }
    public ProductResponse(boolean success, int code, String message) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
    }
    public ProductResponse(boolean success, List<TempProduct> products, int code) {
        super();
        this.success = success;
        this.products = products;
        this.code = code;
 
    }
    
    public ProductResponse(boolean success, int code, Product product) {
    	super();
        this.success = success;
        this.code = code;
        this.product = product;
    }
    
    public ProductResponse(boolean success, int code, Product product , Set<Category> categories) {
        super();
        this.success = success;
        this.code = code;
        this.product = product;
        this.categories = categories;
    }
    

	public ProductResponse(boolean success, int code, String message, Product product) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
        this.product = product;
    }
	

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
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

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public List<TempProduct> getProducts() {
		return products;
	}

	public void setProducts(List<TempProduct> products) {
		this.products = products;
	}

	@Override
	public String toString() {
		return "ProductResponse [success=" + success + ", code=" + code + ", message=" + message + ", product="
				+ product + ", categories=" + categories + ", products=" + products + "]";
	}

   


}