import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";
import {Account} from "../model/customer-accounts.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Customer[]> {
   return  this.http.get<Customer[]>(environment.backendHost + "/customers");
 
  }

  public searchCustomers(keyword: string): Observable<Customer[]> {
    return  this.http.get<Customer[]>(environment.backendHost + "/customers/search?keyword=" + keyword);
  }

  public saveNewCustomer(customer: Customer) {
    return  this.http.post<Customer>(environment.backendHost + "/customers", customer);
  }
  public deleteCustomer(id: number) {
    return  this.http.delete(environment.backendHost + "/customers/" + id);
  }

  updateCustomer(customer: Customer) {
    return  this.http.put<Customer>(environment.backendHost + "/customers/" + customer.id, customer);

  }

  public getAccountsByCustomer(customerId: number): Observable<Account[]> {

    return  this.http.get<Account[]>(environment.backendHost + "/customers/" + customerId + "/accounts");
  }


  public getAllBankAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(environment.backendHost + "/accounts");
  }

  public getCustomerById(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(environment.backendHost +"customers/" + customerId);
  }
}
