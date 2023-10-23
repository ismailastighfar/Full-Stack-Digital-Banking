package com.me.ebanking.dtos;

import com.me.ebanking.enums.AccountStatus;
import lombok.Data;

import java.util.Date;

@Data
public class SavingAccountDTO extends BankAccountDTO{
    private String id;
    private double balance;
    private Date createdAt;
    private AccountStatus status;
    private CustomerDTO customerDTO;
    private double interestRate;
}
