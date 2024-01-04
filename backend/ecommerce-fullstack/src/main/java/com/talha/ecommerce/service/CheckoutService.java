package com.talha.ecommerce.service;

import com.stripe.model.PaymentIntent;
import com.talha.ecommerce.dto.PaymentInfo;
import com.talha.ecommerce.dto.Purchase;
import com.talha.ecommerce.dto.PurchaseResponse;
import org.hibernate.service.spi.ServiceException;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent  createPaymentIntent (PaymentInfo paymentInfo) throws ServiceException;
}
