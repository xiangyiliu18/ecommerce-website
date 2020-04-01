package com.eworld.ProductService.https;

import java.util.List;
import com.eworld.ProductService.beans.Category;


public class CategoryResponse {
    private boolean success;
    private int code;
    private String message;
    private Category category;
    private List<Category> categories;
    
    public CategoryResponse() {
        super();
    }
    
    public CategoryResponse(boolean success) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = "";
    }
    
    public CategoryResponse(boolean success, String message) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = message;
    }
    public CategoryResponse(boolean success, int code, String message) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
    }
    public CategoryResponse(boolean success, List<Category> categories) {
        super();
        this.success = success;
        this.categories = categories;
    }
    
    
	public CategoryResponse(boolean success, int code, String message, Category category) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
        this.category = category;
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	@Override
	public String toString() {
		return "CategoryResponse [success=" + success + ", code=" + code + ", message=" + message + ", category="
				+ category + ", categories=" + categories + "]";
	}


   


}