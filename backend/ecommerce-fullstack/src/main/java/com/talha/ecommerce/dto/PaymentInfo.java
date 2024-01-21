package com.talha.ecommerce.dto;

import lombok.Data;

@Data
public class PaymentInfo {

    //amount how will use amout $12.45 now you will take this in lowest unit that is cent so value 1245 cent
    private int amount;
    private String currency;
    private String receiptEmail;
}
