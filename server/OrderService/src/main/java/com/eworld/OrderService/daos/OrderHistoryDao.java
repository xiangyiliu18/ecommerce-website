package com.eworld.OrderService.daos;


import org.springframework.data.jpa.repository.JpaRepository;
import com.eworld.OrderService.beans.OrderHistory;

public interface OrderHistoryDao  extends JpaRepository<OrderHistory, Integer>{

}
