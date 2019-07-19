package com.msultan.spring.service;

import com.msultan.spring.model.Product;
import com.msultan.spring.repository.ProductRepository;
import com.msultan.spring.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

	private ProductRepository repository;

	@Autowired
	public ProductService(ProductRepository repository) {
		this.repository = repository;
	}

	public List<Product> findAll() {return repository.findAll();}

	public List<Product> findAllByBrand(String name) {return repository.findAllByBrand(name);}

	public List<Product> findAllByCategory(String category) {return repository.findAllByCategory(category);}

	public List<Product> findAllByCurrentPriceLessThanEqual(int price){return repository.findAllByCurrentPriceLessThanEqual(price);}

	public List<Product> findAllByCurrentPriceGreaterThanEqual(int price){return repository.findAllByCurrentPriceGreaterThanEqual(price);}

	public Optional<Product> findByUpc(String upc) {return repository.findByUpc(upc);}

	public Response save(Product product){
		Response productSaveResponse = new Response();
		Optional<Product> existingProduct = findByUpc(product.getUpc());
		existingProduct.ifPresent(p -> repository.delete(p));
		productSaveResponse.setResponse(true);
		repository.save(product);
		return productSaveResponse;
	}

}
