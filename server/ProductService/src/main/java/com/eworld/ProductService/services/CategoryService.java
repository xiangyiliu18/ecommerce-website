package com.eworld.ProductService.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eworld.ProductService.beans.Category;
import com.eworld.ProductService.beans.Product;
import com.eworld.ProductService.daos.CategoryDao;
import com.eworld.ProductService.daos.ProductDao;
import com.eworld.ProductService.https.CategoryResponse;

@Service
public class CategoryService {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Autowired
	CategoryDao categoryDao;
	
	@Autowired
	ProductDao productDao;
	
	
	public CategoryResponse getAll() {
		return new CategoryResponse(true, categoryDao.findAll());
	}

	public CategoryResponse findCategoryById(int id) {
		Optional<Category> category = categoryDao.findById(id);
		if(category.isPresent()) {
			return new CategoryResponse(true, 200, "Find it!", category.get());
		}else {
			return new CategoryResponse(false, 200, "Failed to find the category with id: " + id);
		}
	}
	
	public CategoryResponse updateCategoryById(int id, String newName) {
		Optional<Category> category = categoryDao.findById(id);
		if(category.isPresent()) {
			short level = category.get().getLevel();
			Category existC = categoryDao.findByNameAndLevel(newName, level);
			if(existC != null) {
			 return new CategoryResponse(false, 200, "Failed to update the category: " + newName + "alerady exist in  level" + level );
			}else {
				 // able to update
				category.get().setName(newName);
				categoryDao.save(category.get());
				return new CategoryResponse(true, 200, "Update Successfully!");
			}
			
		}else {
			return new CategoryResponse(false, 200, "Failed to find the category with id: " + id);
		}
	
	}
	
	
	public CategoryResponse addCategory(Category newCategory) {
		String name = newCategory.getName();
		short level = newCategory.getLevel();
		LOGGER.info("Enter add category .....");
		Category existC = categoryDao.findByNameAndLevel(name, level);
		LOGGER.info("Enter add category 2.....");
		if(existC == null) {
			List<Category> parentC = (List<Category>) categoryDao.findByParentId(newCategory.getId());
			
			if((newCategory.getParentId() != 0) && (parentC == null || parentC.size() < 1) ) {
				return new CategoryResponse(false, 200, "Failed to add the category--did not find its valid parent with id: " + newCategory.getParentId());
			}else {
				categoryDao.save(newCategory);
				if(newCategory.getParentId() == 0) {
					newCategory.setParentId(newCategory.getId());
					categoryDao.save(newCategory);
				}
				
				return new CategoryResponse(true, 200, "Add New Category successfully!");
			}
		}else {
			 return new CategoryResponse(false, 200, "Failed to reate the category: " + name + "alerady exist in  level" + level );
		}
		
	}
	
	public CategoryResponse deleteCategoryById(int id) {
		if(id == 682) { // 'Other'
			return new CategoryResponse(false, 200, "No authority to delete this category");
		}
		Optional<Category> category = categoryDao.findById(id);
		if(category.isPresent()) {
			short level = category.get().getLevel();
			Set<Product> set = new HashSet<Product>(category.get().getProducts());
			Set<Category> set2 = new HashSet<>();
			set2.add(categoryDao.findById(682).get());
			for(Product p : set) {
				p.getCategories().remove(category.get());
				if(p.getCategories() == null || p.getCategories().size() < 1)
					p.setCategories(set2);
				productDao.save(p);
			}
	       categoryDao.deleteById(id);
	       return new CategoryResponse(true, 200, "Delete the category with id: " + id +" Successfully!");
			
		}else {
			return new CategoryResponse(false, 200, "Failed to find the category with id: " + id +" to be deleted");
		}
	}
}
