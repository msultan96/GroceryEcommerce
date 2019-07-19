package com.msultan.spring.util;

import com.msultan.spring.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateCartUtil {
	private String username;
	private String stringifyProduct;
	private Product product;
}
