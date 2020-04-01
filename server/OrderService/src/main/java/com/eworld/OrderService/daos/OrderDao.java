package com.eworld.OrderService.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.eworld.OrderService.beans.Order;

public interface OrderDao extends JpaRepository<Order, Integer>{
		//public List<Order> findAllByCustomer(Customer customer);
}
