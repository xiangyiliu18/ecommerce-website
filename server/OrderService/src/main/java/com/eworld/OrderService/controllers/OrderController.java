package com.eworld.OrderService.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eworld.OrderService.https.Response;
import com.eworld.OrderService.services.MailService;
import com.eworld.OrderService.services.OrderService;

@RestController
@RequestMapping("/")
public class OrderController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private MailService mailService;
	
	
	@Autowired
	OrderService orderService;
	
//	@Autowired
//	ProductClient productClient;
	
	
	@GetMapping
	public ResponseEntity<Response> getAllOrders() {
		LOGGER.info("Enter getAllOrders");
		return  ResponseEntity.ok().body(orderService.getAllOrders());
	}

//	@GetMapping("/detail/customer/{id}")
//	public OrderResponse getOrderByCustomerId(@PathVariable int id) {
//		return orderService.getOrderByCustomerId(id);
//	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Response> getOrderById(@PathVariable int id) {
		return ResponseEntity.ok().body(orderService.getOrderById(id));
	}
	
	
//	@GetMapping("/detail/{username}")
//	public OrderResponse getOrderById(@PathVariable String username) {
//		return orderService.getOrderByCustomerUsername(username);
//	}
	
//	@GetMapping("/orderHistory/{id}")
//	public HistoryResponse getOrderHistoryById(@PathVariable int id) {
//		return orderService.getOrderHistoryById(id);
//	}
//	
//	
	@PostMapping("/update/{id}")
	public ResponseEntity<Response> updateOrderById(
			@PathVariable int id, @RequestParam int status, @RequestParam String username, @RequestParam String comment , @RequestParam String email
			) {
		 // username ===> operator
		// 4 --- cancelled, 5 ---- return
		String[] states = {"New Placed Order","In delivering", "Delivered", "Cancelled", "Returned"};
		String  text = "Thanks for your shopping on EWORLD, Your current order status: " + states[status -1];
		try{
            mailService.sendEmail(email, "EWORLD: Order Status Tracking", text);	
		}catch (MailException e) {
		     return ResponseEntity.ok().body(new Response(false, 400, "Email not sent.. mailexception"));
		}catch (Exception e) {
			 return ResponseEntity.ok().body(new Response(false, 400, "Email not sent.."));
		}
		 return ResponseEntity.ok().body(orderService.updateOrderById(id, status, username, comment));
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}