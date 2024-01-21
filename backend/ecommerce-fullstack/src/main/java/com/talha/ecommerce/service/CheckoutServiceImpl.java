package com.talha.ecommerce.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.talha.ecommerce.dao.CustomerRepository;
import com.talha.ecommerce.dto.PaymentInfo;
import com.talha.ecommerce.dto.Purchase;
import com.talha.ecommerce.dto.PurchaseResponse;
import com.talha.ecommerce.entity.Customer;
import com.talha.ecommerce.entity.Order;
import com.talha.ecommerce.entity.OrderItem;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService {


    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository,
                               @Value("${stripe.key.secret}") String secretKey) {
        this.customerRepository = customerRepository;
        Stripe.apiKey = secretKey;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        Customer checkExistingCustomer = customerRepository.findByEmail(customer.getEmail());
        if(checkExistingCustomer!=null){
            customer = checkExistingCustomer;
        }
        customer.add(order);
        customerRepository.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws ServiceException {
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String,Object> params = new HashMap<>();
        params.put("amount",paymentInfo.getAmount());
        params.put("currency",paymentInfo.getCurrency());
        params.put("payment_method_types",paymentMethodTypes);
        params.put("receipt_email",paymentInfo.getReceiptEmail());
        params.put("description","WELCOME SHOP");


        try {
            return PaymentIntent.create(params);
        } catch (StripeException e) {
            e.printStackTrace();
        }
        return  null;
    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}
