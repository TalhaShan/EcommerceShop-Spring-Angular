package com.talha.ecommerce.dto;

import lombok.Data;

@Data  //data create constructor only for not null or private field
public class PurchaseResponse {

    private final String orderTrackingNumber;


}
