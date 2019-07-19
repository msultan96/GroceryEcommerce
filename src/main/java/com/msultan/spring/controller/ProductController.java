package com.msultan.spring.controller;

import com.msultan.spring.model.Product;
import com.msultan.spring.response.Response;
import com.msultan.spring.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/product")
public class ProductController {

	private ProductService productService;

	@Autowired
	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@PostMapping(value="/save")
	public Response save(@RequestBody Product product){ return productService.save(product);}

	@GetMapping(value="/findAll")
	public List<Product> findAll(){
		return productService.findAll();}

	@GetMapping(value="/findAll/ByCategory/{category}")
	public List<Product> findAllByCategory(@PathVariable String category){return productService.findAllByCategory(category);}

	@GetMapping(value="/findAll/ByBrand/{name}")
	public List<Product> findAllByBrand(@PathVariable String name){return productService.findAllByBrand(name);}

	@GetMapping(value="/findAll/ByCurrentPriceLessThan/{price}")
	public List<Product> findAllByCurrentPriceLessThanEqual(@PathVariable int price){return productService.findAllByCurrentPriceLessThanEqual(price);}

	@GetMapping(value="/findAll/ByCurrentPriceGreaterThan/{price}")
	public List<Product> findAllByCurrentPriceGreaterThanEqual(@PathVariable int price){return productService.findAllByCurrentPriceGreaterThanEqual(price);}

	@GetMapping(value="/findByUpc/{upc}")
	public Optional<Product> findByUpc(@PathVariable String upc){return productService.findByUpc(upc);}
}
