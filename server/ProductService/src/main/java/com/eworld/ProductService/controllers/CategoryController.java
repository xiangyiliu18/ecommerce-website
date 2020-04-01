package com.eworld.ProductService.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eworld.ProductService.beans.Category;
import com.eworld.ProductService.https.CategoryResponse;
import com.eworld.ProductService.services.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {
	    
		@Autowired
		CategoryService categoryService;
		
		@GetMapping
		public CategoryResponse getAllCategories() {
			return categoryService.getAll();
		}
		
		@PostMapping("/add")
		public CategoryResponse addCategory(@RequestBody Category newCategory) {
			return categoryService.addCategory(newCategory);
		}
		
		@PostMapping("/update/{id}")
		public CategoryResponse updateCategoryById(@PathVariable int id, @RequestParam String newName) {
			return categoryService.updateCategoryById(id, newName);
		}
		
		
		@DeleteMapping("/delete/{id}")
		public CategoryResponse deleteCategoryById(@PathVariable int id) {
				return categoryService.deleteCategoryById(id);
		}
	
		
}
