package com.eworld.ProductService.controllers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.eworld.ProductService.beans.Product;
import com.eworld.ProductService.https.ProductResponse;
import com.eworld.ProductService.services.ProductService;

@RestController
@RequestMapping("/")
public class ProductController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	ProductService productService;
	
	@GetMapping
	public ProductResponse getAllProducts() {
		return productService.getAll();
	}
	
	@GetMapping("/top10")
	public ProductResponse getTop10Products() {
		return productService.findTop10Products();
	}
	
//	@GetMapping("/count")
//	public ProductResponse getCountProduct() {
//		return  productService.getCount();
//	}
	@PostMapping("/add")
	public ProductResponse addProduct(@RequestBody Product newProduct) {
		return productService.addProduct(newProduct);
	}
	
	@GetMapping("/detail/{id}")
	public ProductResponse getProductById(@PathVariable int id) {
		return productService.findProductById(id);
	}
	
	@PostMapping("/update/{id}")
	public ProductResponse updateProductById(@PathVariable int id, @RequestBody Product newProduct) {
//		System.out.println(newProduct);
		return productService.updateProductById(id, newProduct);
	}
	
	@PostMapping("/active/{id}")
	public ProductResponse activeProductById(@PathVariable int id, @RequestParam short active) {
		if(active == 1) {
			return productService.activeProductById(id);
		}else {
			return productService.inactiveProductById(id);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ProductResponse deleteProductById(@PathVariable int id) {
			return productService.deleteProductById(id);
	}
	
}