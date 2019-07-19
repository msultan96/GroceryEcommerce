package com.msultan.spring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.LinkedHashMap;


@Document(collection = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

	@Id
	private String id;
	private String username;
	private String password;
	private String email;
	private String firstName;
	private String lastName;
	private String[] role;
	private LinkedHashMap<String, Integer> cart;
}
