package com.talha.ecommerce.service;

import com.talha.ecommerce.dto.Purchase;
import com.talha.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
