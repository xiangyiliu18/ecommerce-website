package com.eworld.ProductService.services;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eworld.ProductService.beans.Product;
import com.eworld.ProductService.beans.Category;
import com.eworld.ProductService.daos.CategoryDao;
import com.eworld.ProductService.daos.ProductDao;
import com.eworld.ProductService.https.ProductResponse;
import com.eworld.ProductService.https.TempProduct;

@Service
public class ProductService {
	
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private AmazonClient amazonClient;
	
	@Autowired
	ProductDao productDao;
	
	@Autowired
	CategoryDao categoryDao;
	
	public ProductResponse getAll() {
		List<Product> products = productDao.findAll();
		List<TempProduct> tempProducts =new ArrayList<>();
		for (Product p: products) {
			tempProducts.add(new TempProduct(p.getId(), p.getName(), p.getBrand(), p.getPrice(), p.getStock(),p.getStatus(), p.getSell()));
			
		}
		return new ProductResponse(true, tempProducts, 0) ;
	}
	
	public ProductResponse findTop10Products() {
		List<Product> products = productDao.findTop10ByOrderBySellDesc();
		List<TempProduct> tempProducts =new ArrayList<>();
		for (Product p: products) {
			tempProducts.add(new TempProduct(p.getId(), p.getName(), p.getBrand(), p.getPrice(), p.getStock(),p.getStatus(), p.getSell()));
			
		}
		//return new ProductResponse(true, productDao.findTop10ByOrderBySellDesc());
		return new ProductResponse(true, tempProducts, (int)productDao.count());
	}
	
	public  ProductResponse getCount() {
		return new ProductResponse(true, 200,productDao.count()+"");
	}
	
	public ProductResponse findProductById(int id) {
		Optional<Product> product= productDao.findById(id);
		if(product.get() != null) {
			return new ProductResponse(true, 200, product.get(), product.get().getCategories());
		}else {
			return new ProductResponse(false, "Did not find the valid product with id: " + id);
		}
	}
	
	public ProductResponse updateProductById(int id, Product newProduct) {
		LOGGER.info("Enter update Product.....");
		LOGGER.info(newProduct.toString());
		Optional<Product> product= productDao.findById(id);
		if(product.isPresent()) {
			Product p = product.get();
			String name = newProduct.getName();
//			String brand = newProduct.getBrand();
			double price = newProduct.getPrice();
			String image = newProduct.getImage();
			int stock = newProduct.getStock();
			String description = newProduct.getDescription();
			short status = newProduct.getStatus();
//			List<Category> List = new ArrayList<Category>(p.getCategories());
//			for(Category c: List) {
//				p.getCategories().remove(c);
//			}
//			List<Category> newCategories = new ArrayList<>();
//			for(Category c: newProduct.getCategories()) {
//				newCategories.add(categoryDao.findById(c.getId()).get());
//			}
//			LOGGER.info("New Category.....");
//			LOGGER.info(newCategories.toString());
//			p.setCategories(newCategories);
		    p.setName(name);
//		    p.setBrand(brand);
		    p.setPrice(price);
		    p.setStatus(status);
		    p.setStock(stock);
		    p.setDescription(description);
		    p.setUpdate_timestamp(new Date());
		    if(image == null) {
		    	image = "";
		    }
		    p.setImage(image);

			productDao.save(p);
			return new ProductResponse(true, 200, "Update Successfully!");
		}else {
			return new ProductResponse(false, "Did not find the valid product with id: " + newProduct.getId());
		}
	}
	
	public ProductResponse inactiveProductById(int id) {
		Optional<Product> product= productDao.findById(id);
		if(product.isPresent()) {
			Product p = product.get();
			p.setStatus((short)0);
			productDao.save(p);
			return new ProductResponse(true, 200, "The product with " + id + " is set to be not available Successfully!");
		}else {
			return new ProductResponse(false, "Did not find the valid product with id: " + id);
		}
	}
	
	public ProductResponse activeProductById(int id) {
		LOGGER.info("Enter active Product.....");
		Optional<Product> product= productDao.findById(id);
		if(product.get() != null) {
			Product p = product.get();
			p.setStatus((short)1);
			productDao.save(p);
			return new ProductResponse(true, 200, "The product with " + id + " is set to be launching Successfully!");
		}else {
			return new ProductResponse(false, "Did not find the valid product with id: " + id);
		}
	}
	
	public ProductResponse addProduct(Product newProduct) {
		LOGGER.info("Enter addProduct.....");
		LOGGER.info(newProduct.toString());
		
//		Set<Category> categories = newProduct.getCategories();
		//Set<Category> newCategories = new HashSet<>();
//		if(categories == null || categories.size() < 1) {
//			return new ProductResponse(false, 200, "Category cannot be emptied");
//		} 
		Optional<Product> exist = productDao.findById(newProduct.getId());		
		if(exist.isPresent()) { // make sure product id is not duplicated
			return new ProductResponse(false, 200, "The id of product is duplicated");
		}else {
//			LOGGER.info("Create here.....");
//			categories.forEach((ele) -> {
			//	 Category category = categoryDao.findById(682).get();
//				 LOGGER.info(category.toString());
//				 newCategories.add(category);
//			});
		// relate categories to product
			Date now = new Date();
			newProduct.setCreate_timestamp(now);
			newProduct.setUpdate_timestamp(now);
//			newProduct.setCategories(newCategories);
			productDao.save(newProduct);
			return new ProductResponse(true, 200, "Upload product successfully!");
		}
	}
	
	public ProductResponse deleteProductById(int id) {
		 try {
			 Optional<Product> p = productDao.findById(id);
			 if(p.isPresent()) {
				 Set<Category> set = new HashSet<Category>(p.get().getCategories());
					for(Category c : set) {
						p.get().getCategories().remove(c);
					}
					productDao.deleteById(id);
					return new ProductResponse(true, 200, "Delete Product with " + id +" Successfully");
				     
			 }else {
				 return new ProductResponse(false, 200, "Prodcut ID: "+id+" does not exist!");
			 }
			 
		 }catch(Exception e) {
			 return new ProductResponse(false, 400, e.getMessage());
		 }
	}
}
