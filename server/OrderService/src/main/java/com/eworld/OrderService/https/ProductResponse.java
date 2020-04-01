package com.eworld.OrderService.https;
import java.util.List;

import com.eworld.OrderService.beans.Product;


public class ProductResponse {
    private boolean success;
    private int code;
    private String message;
    private Product product;
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
    public ProductResponse(boolean success, List<TempProduct> products) {
        super();
        this.success = success;
        this.products = products;
    }
    
    public ProductResponse(boolean success, int code, Product product) {
        super();
        this.success = success;
        this.code = code;
        this.product = product;
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
				+ product + ", products=" + products + "]";
	}
}