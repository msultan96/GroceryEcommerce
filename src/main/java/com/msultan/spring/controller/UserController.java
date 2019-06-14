package com.msultan.spring.controller;

import com.msultan.spring.model.User;
import com.msultan.spring.response.UserLoginResponse;
import com.msultan.spring.response.UserRegistrationResponse;
import com.msultan.spring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping(value = "/users")
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	// Shouldn't be utilizing GET requests to retrieve Users
	/*

	@GetMapping(value="/")
	public List<User> getAllUsers(){
		return userService.findAll();
	}

	@GetMapping(value="/id/{id}")
	public Optional<User> getUserById(@PathVariable("id") String id) {
		return Optional.of(userService.findById(id).get());
	}

	@GetMapping(value="/email/{email:.+}")
	public Optional<User> getUserByEmail(@PathVariable("email") String email) {
		return Optional.of(userService.findByEmail(email).get());
	}

	@GetMapping(value="/username/{userName}")
	public Optional<User> getUserByUserName(@PathVariable("userName") String userName) {
		return Optional.of(userService.findByUserName(userName).get());
	}

	*/

	@PostMapping(value="/login")
	public UserLoginResponse getUserByUserNameAndPassword(@RequestBody User user){
		return userService.verify(user);
	}

	@PutMapping(value="/")
	public UserRegistrationResponse createUser(@Valid @RequestBody User user) {
		return userService.save(user);
	}

	// Shouldn't allow access to delete users
	/*
	@DeleteMapping(value = "/id/{id}")
	public void deleteUser(@PathVariable String id){
		userService.deleteById(id);
	}
	*/
}
