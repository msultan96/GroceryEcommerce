package com.msultan.spring.controller;

import com.msultan.spring.model.User;
import com.msultan.spring.response.UserLoginResponse;
import com.msultan.spring.response.UserRegistrationResponse;
import com.msultan.spring.service.UserService;
import com.msultan.spring.util.GetCartUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(value = "/user")
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}


	@PostMapping(value="/login", produces = "application/json")
	public UserLoginResponse getUserByUserNameAndPassword(@RequestHeader(value="Authorization") String auth,
	                                                      @RequestBody User user){
		return userService.verify(user);
	}

	@PutMapping(value="/", produces = "application/json")
	public UserRegistrationResponse createUser(@Valid @RequestBody User user) {

		return userService.save(user);
	}

	@PostMapping(value="/addToCart", produces = "application/json")
	public void addToCart(@RequestBody Map<String, String> requestBody) throws IOException {
		userService.addToCart(requestBody.get("username"), requestBody.get("productUpc"));
	}

	@PostMapping(value="/removeFromCart", produces = "application/json")
	public void removeFromCart(@RequestBody Map<String, String> requestBody) throws IOException {
		userService.removeFromCart(requestBody.get("username"), requestBody.get("productUpc"));
	}

	@PostMapping(value="/getCart")
	public GetCartUtil getCart(@RequestBody String username){
		GetCartUtil getCartUtil = new GetCartUtil();
		getCartUtil.setCart(userService.getCart(username));
		return getCartUtil;
	}
}
