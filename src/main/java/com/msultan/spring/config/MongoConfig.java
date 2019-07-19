package com.msultan.spring.config;

import com.mongodb.MongoClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.msultan.spring.repository")
public class MongoConfig extends AbstractMongoConfiguration {

	@Override
	protected String getDatabaseName() {
		return "ecommerce_grocery";
	}

	@Override
	public MongoClient mongoClient() {
		return new MongoClient("127.0.0.1", 27017);
	}

}
