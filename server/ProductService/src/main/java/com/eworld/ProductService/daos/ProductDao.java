package com.eworld.ProductService.daos;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eworld.ProductService.beans.Product;


public interface ProductDao extends JpaRepository<Product, Integer>{
	    List<Product> findTop10ByOrderBySellDesc();
		
}
