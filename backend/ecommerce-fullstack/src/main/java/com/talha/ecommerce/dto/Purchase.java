package com.talha.ecommerce.dto;

import com.talha.ecommerce.entity.Address;
import com.talha.ecommerce.entity.Customer;
import com.talha.ecommerce.entity.Order;
import com.talha.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
