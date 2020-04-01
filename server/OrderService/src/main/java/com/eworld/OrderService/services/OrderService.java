package com.eworld.OrderService.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eworld.OrderService.beans.Order;
import com.eworld.OrderService.beans.OrderHistory;
import com.eworld.OrderService.daos.CustomerDao;
import com.eworld.OrderService.daos.OrderDao;
import com.eworld.OrderService.daos.OrderHistoryDao;
import com.eworld.OrderService.https.HistoryResponse;
import com.eworld.OrderService.https.Response;

@Service
public class OrderService {
	
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@Autowired 
	OrderDao orderDao;
	
	@Autowired
	CustomerDao customerDao;
	
	@Autowired
	OrderHistoryDao orderHistoryDao;

	
	
	public Response getAllOrders() {
		List<Order> orders = orderDao.findAll();
		return new Response(true, "Get all orders successfully", orders);
	}
	
	
	
	public Response getOrderById(int id) {
		Optional<Order> order = orderDao.findById(id);
		if(order.isPresent()) {
			return new Response(true, 200, "get order  with id: "+id+ " successfully", order.get() );
		}else {
			
			return new Response(false,200, "Failed, did not find the order with id: "+id);
		}
		
	}
//	
//	public OrderResponse getOrder
//	
//	public OrderResponse getOrderByCustomerId(int id) {
//		Optional<Customer> customer = customerDao.findById(id);
//		if(!customer.isPresent()) {
//			return new OrderResponse(false, 200, "Failed, the customer with id: "+id+" does not exist!" );
//		}
//		// find the customer
//		List<Order> orders = orderDao.findAllByCustomer(customer.get());
//		if(orders == null || orders.size() < 1) {
//			return new OrderResponse(false, 200, "The customer with: id"+ id +"do not have any products yet");
//		}
//		else {
//			return new OrderResponse(true, orders);
//		}
//	}
	
	
//	public OrderResponse getOrderByCustomerUsername(String username) {
//		Optional<Customer> customer = customerDao.findByUsername(username);
//		if(!customer.isPresent()) {
//			return new OrderResponse(false, 200, "Failed, the customer with id: "+username+" does not exist!" );
//		}
//		// find the customer
//		List<Order> orders = orderDao.findAllByCustomer(customer.get());
//		if(orders == null || orders.size() < 1) {
//			return new OrderResponse(false, 200, "The customer with: id"+ username +"do not have any products yet");
//		}
//		else {
//			return new OrderResponse(true, orders);
//		}
//	}
//	

	
	public Response updateOrderById(int id, int status, String username, String comment) {
		// 1---new, 2----in delivering 3 ----delivered ; 4 -----complete ; 5 ----- cancelled
		LOGGER.info(username);
		Optional<Order> order = orderDao.findById(id);

		if(order.isPresent()) {
			 Order o = order.get();
			 o.setStatus(status);
		    Set<OrderHistory> histories = o.getHistories();
		    LOGGER.info(histories.size()+"");
			OrderHistory newHistory = new OrderHistory();
			
			newHistory.setOperationUsername(username);
			newHistory.setStatus(status);
			newHistory.setOrder(o);
			newHistory.setComment(comment);
			newHistory.setOperationDate(new Date());
			histories.add(newHistory);
			orderDao.save(o);	
			return new Response(true, 200,"Update Order Status Successfully!");
		}else {
			return new Response(false,200, "Failed, did not find the order with id: "+id);
		}
	}
	
	public HistoryResponse getOrderHistoryById(int id) {
		// Order Id
		Optional<Order> order = orderDao.findById(id);
		LOGGER.info("Enter Here..... OrderHistory......");
		if(order.isPresent()) {
			return new HistoryResponse(true, order.get().getHistories());
		}else {
			return new HistoryResponse(false, 200, "Failed to get the order history, the ID ("+id+") does not exist");
		}
		
	}
	
}
