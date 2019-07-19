package com.msultan.spring.repository;

import com.msultan.spring.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

	Optional<Product> findByUpc(String upc);

	List<Product> findAllByCategory(String category);

	List<Product> findAllByBrand(String name);

	List<Product> findAllByCurrentPriceLessThanEqual(double price);

	List<Product> findAllByCurrentPriceGreaterThanEqual(double price);

}
