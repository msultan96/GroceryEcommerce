package com.msultan.spring.repository;

import com.msultan.spring.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findById(String id);

	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);
}
