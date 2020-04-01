package com.eworld.OrderService.daos;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eworld.OrderService.beans.Customer;

public interface CustomerDao extends JpaRepository<Customer, Integer>{
     Optional<Customer> findByUsername(String username);
}
