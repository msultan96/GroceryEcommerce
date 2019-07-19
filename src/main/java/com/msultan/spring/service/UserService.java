package com.msultan.spring.service;

import com.msultan.spring.model.User;
import com.msultan.spring.repository.UserRepository;
import com.msultan.spring.response.UserLoginResponse;
import com.msultan.spring.response.UserRegistrationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

	private UserRepository repository;
	private ProductService productService;
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public UserService(UserRepository repository, BCryptPasswordEncoder bCryptPasswordEncoder, ProductService productService) {
		this.repository = repository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
		this.productService = productService;
	}

	public List<User> findAll(){
		return repository.findAll();
	}

	public Optional<User> findById(String id){
		return repository.findById(id);
	}

	private Optional<User> findByEmail(String email){
		return repository.findByEmail(email);
	}

	private Optional<User> findByUsername(String username){
		return repository.findByUsername(username);
	}

	private void deleteById(String id){
		repository.deleteById(id);
	}

	public UserRegistrationResponse save(User user){
		UserRegistrationResponse userRegistrationResponse = new UserRegistrationResponse();
		Optional<User> email = findByEmail(user.getEmail());
		if(email.isPresent()){
			userRegistrationResponse.setEmailTaken(true);
			userRegistrationResponse.setRegistrationResponse(false);
		}
		Optional<User> username = findByUsername(user.getUsername());
		if(username.isPresent()){
			userRegistrationResponse.setUsernameTaken(true);
			userRegistrationResponse.setRegistrationResponse(false);
		}
		if(!userRegistrationResponse.isEmailTaken() && !userRegistrationResponse.isUsernameTaken()){
			userRegistrationResponse.setRegistrationResponse(true);
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			repository.save(user);
		}
		return userRegistrationResponse;
	}

	public UserLoginResponse verify(User user){
		UserLoginResponse userLoginResponse = new UserLoginResponse();
		Optional<User> query = findByUsername(user.getUsername());
		if(query.isPresent()){
			userLoginResponse.setUsernameExists(true);
			if(bCryptPasswordEncoder.matches(user.getPassword(),query.get().getPassword())) {
				userLoginResponse.setUsername(query.get().getUsername());
				userLoginResponse.setEmail(query.get().getEmail());
				userLoginResponse.setFirstName(query.get().getFirstName());
				userLoginResponse.setLastName(query.get().getLastName());
				userLoginResponse.setPasswordValid(true);
				userLoginResponse.setMessage("Welcome!");
				userLoginResponse.setResponse(true);
			}
			else{
				userLoginResponse.setMessage("Incorrect password");
				userLoginResponse.setResponse(false);
			}
		} else{
			userLoginResponse.setMessage("The username does not exist");
			userLoginResponse.setResponse(false);
		}
		return userLoginResponse;
	}

	@Override
	public UserDetails loadUserByUsername(String username){
		return null;
	}

	public Map<String, Integer> getCart(String username){
		Optional<User> user = findByUsername(username);
		LinkedHashMap<String, Integer> cart = new LinkedHashMap<>();
		user.ifPresent(u -> cart.putAll(u.getCart()));
		return cart;
	}

	public void addToCart(String username, String upc){
		Optional<User> user = findByUsername(username);
		user.ifPresent(u ->{
			u.getCart().put(upc, u.getCart().getOrDefault(upc, 0)+1);
			repository.save(u);
		});
	}

	public void removeFromCart(String username, String upc) {
		Optional<User> user = findByUsername(username);
		user.ifPresent(u -> {
			int quantity = u.getCart().get(upc) - 1;
			u.getCart().put(upc, quantity);
			if (quantity == 0) u.getCart().remove(upc);
			repository.save(u);
		});
	}
}