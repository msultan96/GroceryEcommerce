package com.msultan.spring.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRegistrationResponse {

	private boolean registrationResponse;
	private boolean emailTaken;
	private boolean userNameTaken;

}
