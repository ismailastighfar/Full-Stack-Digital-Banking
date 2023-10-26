import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccountOperations(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/" + accountId + "/pageOperations?page=" + page + "&size=" + size);
  }

  public debit(accountId: string, amount: number, description: string) {
    let data = {accountId: accountId, amount: amount, description: description}
    return this.http.post(environment.backendHost+"/accounts/debit", data);
  }

  public credit(accountId: string, amount: number, description: string) {
    let data = {accountId: accountId, amount: amount, description: description}
    return this.http.post<AccountDetails>(environment.backendHost+"/accounts/credit", data);
  }

  public transfer(accountDestination:string,accountSource:string, amount: number, description: string) {
    let data = {accountDestination,accountSource,amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/transfer", data);
  }

  public newCurrentAccount(balance: number, overDraft: number, customerId: number) {
    let data = {balance, overDraft, customerId}
    return this.http.post(environment.backendHost+"/customers/" + customerId +"/current-accounts?overDraft=" + overDraft + "&initialBalance=" + balance , data);
  }
  public newSavingAccount(balance: number, interestRate: number, customerId: number) {
    let data = {balance, interestRate, customerId}
    return this.http.post(environment.backendHost+"/customers/" + customerId +"/saving-accounts?interestRate=" + interestRate + "&initialBalance=" + balance , data);
  }
}
