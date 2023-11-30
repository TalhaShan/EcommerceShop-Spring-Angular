package com.talha.ecommerce.dao;

import com.talha.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);
}
