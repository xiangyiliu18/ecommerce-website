package com.eworld.OrderService.daos;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eworld.OrderService.beans.Product;

public interface ProductDao extends JpaRepository<Product, Integer>{

}
