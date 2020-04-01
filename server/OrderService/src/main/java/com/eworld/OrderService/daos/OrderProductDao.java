package com.eworld.OrderService.daos;
import org.springframework.data.jpa.repository.JpaRepository;

import com.eworld.OrderService.beans.OrderProduct;

public interface OrderProductDao extends JpaRepository<OrderProduct, Integer>{

}
