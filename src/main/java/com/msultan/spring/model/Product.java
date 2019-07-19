package com.msultan.spring.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection="products")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {
	private String upc;
	private String brand;
	private String type;
	private String variety;
	private String weight;
	private String category;
	private boolean availability;
	private double currentPrice;
	private double regularPrice;
	private double salePrice;
	private Date saleDateStart;
	private Date saleDateEnd;
	private String image;
}
