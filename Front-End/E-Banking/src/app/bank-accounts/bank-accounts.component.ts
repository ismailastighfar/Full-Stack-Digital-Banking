import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Account} from "../model/customer-accounts.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {
  bankAccounts$!: Observable<Account[]>;
  customer$!: Observable<Customer>;
  customerId!:string;
  customer!: Customer;
  errorMessage!: Object;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.bankAccounts$ = this.customerService.getAllBankAccounts().pipe(
    catchError(err => {
       this.errorMessage = err.message;
       return throwError(err);
    }));
  }

  handleCustomerPageFromBankAccounts(customer: Customer) {
    this.router.navigateByUrl("/customers/" + customer.id, {state: customer}).then(r => {
    })
  }
}
