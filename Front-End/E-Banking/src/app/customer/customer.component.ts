import { Component, OnInit } from '@angular/core';
import {Customer} from "../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerId!: string;
  customer!: Customer;
  customer$!: Observable<Customer>;
  errorMessage!: Object;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }
  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
  }

/*  handleCustomerByCustomerId(customerId: string) {
    this.customer$ = this.customerService.getCustomerById(customerId).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }*/

}
