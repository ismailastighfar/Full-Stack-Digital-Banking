package com.me.ebanking.web;

import com.me.ebanking.dtos.*;
import com.me.ebanking.enums.AccountStatus;
import com.me.ebanking.exceptions.BalanceNotSufficientException;
import com.me.ebanking.exceptions.BankAccountNotFoundException;
import com.me.ebanking.exceptions.CustomerNotFoundException;
import com.me.ebanking.services.BankAccountService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin("*")
public class BankAccountRestController {
    private BankAccountService bankAccountService;

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @GetMapping("/accounts/{accountId}")
    public BankAccountDTO getBankAccount(@PathVariable String accountId) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(accountId);
    }

    @PostAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/accounts")
    public List<BankAccountDTO> listAccounts(){
        return bankAccountService.bankAccountList();
    }
    @GetMapping("/accounts/{accountId}/operations")
    public List<AccountOperationDTO> getHistory(@PathVariable String accountId){
        return bankAccountService.accountHistory(accountId);
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @GetMapping("/accounts/{accountId}/pageOperations")
    public AccountHistoryDTO getAccountHistory(
            @PathVariable String accountId,
            @RequestParam(name="page",defaultValue = "0") int page,
            @RequestParam(name="size",defaultValue = "5")int size) throws BankAccountNotFoundException {
        return bankAccountService.getAccountHistory(accountId,page,size);
    }
    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/accounts/debit")
    public DebitDTO debit(@RequestBody DebitDTO debitDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.debit(debitDTO.getAccountId(),debitDTO.getAmount(),debitDTO.getDescription());
        return debitDTO;
    }
    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/accounts/credit")
    public CreditDTO credit(@RequestBody CreditDTO creditDTO) throws BankAccountNotFoundException {
        this.bankAccountService.credit(creditDTO.getAccountId(),creditDTO.getAmount(),creditDTO.getDescription());
        return creditDTO;
    }
    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PostMapping("/accounts/transfer")
    public void transfer(@RequestBody TransferRequestDTO transferRequestDTO) throws BankAccountNotFoundException, BalanceNotSufficientException {
        this.bankAccountService.transfer(
                transferRequestDTO.getAccountSource(),
                transferRequestDTO.getAccountDestination(),
                transferRequestDTO.getAmount());
    }

    @PostMapping("/customers/{customerId}/current-accounts")
    public CurrentAccountDTO saveCurrentBankAccount(
            @RequestParam double initialBalance,
            @RequestParam double overDraft,
            @PathVariable Long customerId) throws CustomerNotFoundException {
        log.info("A Current Account has been successfully");
        return bankAccountService.saveCurrentBankAccount(initialBalance, overDraft, customerId);
    }

    @PostMapping("/customers/{customerId}/saving-accounts")
    public SavingAccountDTO saveSavingBankAccount(
            @RequestParam double initialBalance,
            @RequestParam double interestRate,
            @PathVariable Long customerId) throws CustomerNotFoundException {
        log.info("A Saving Account has been successfully");

        return bankAccountService.saveSavingBankAccount(initialBalance, interestRate, customerId);
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @PutMapping("/accounts/{accountId}")
    public BankAccountDTO updateBankAccount(@PathVariable String accountId, @RequestParam AccountStatus accountStatus) throws BankAccountNotFoundException {
        log.info("Update a bank account return with the account type");
        return bankAccountService.updateBankAccount(accountId, accountStatus);
    }

    @PostAuthorize("hasAuthority('ADMIN') or hasAuthority('CUSTOMER')")
    @GetMapping("/customers/{customerId}/accounts")
    public List<BankAccountDTO> getBankAccountsByCustomerId(@PathVariable Long customerId) {
        List<BankAccountDTO> bankAccountDTOS = bankAccountService.getBankAccountsByCustomerId(customerId);
        return bankAccountDTOS;
    }
}
