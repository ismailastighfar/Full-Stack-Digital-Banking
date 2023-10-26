import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {throwError} from "rxjs";
import {AccountsService} from "../services/accounts.service";
import {CurAccount} from "../model/saveAccount.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  errorMessage!: Object;
  newAccountFormGroup!: FormGroup;
  customer!: Customer;
  customerId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountServie: AccountsService) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.newAccountFormGroup = this.fb.group({
      type : this.fb.control(null, [Validators.required]),

      id : this.fb.control(this.customerId),

      balance : this.fb.control(0, [Validators.required, Validators.min(100)]),

      /*accountStatus : this.fb.control(null, [Validators.required]),*/

      overDraft: this.fb.control(0, [Validators.required, Validators.minLength(2)]),
      interestRate: this.fb.control(0, [Validators.required, Validators.min(0.01)])
    });
  }

  handleSaveNewAccount() {
  let curAccount: CurAccount = this.newAccountFormGroup.value;
    curAccount.customerDTO = this.customer;

    if(curAccount.type == 'CurrentAccount') {
      this.accountServie.newCurrentAccount(curAccount.balance, curAccount.overDraft, curAccount.customerDTO.id).subscribe({
        next: data => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'A new current bank account has been added to this customerId: ' + this.customerId,
            showConfirmButton: false,
            timer: 1500
          });
          this.newAccountFormGroup.reset();
          this.router.navigateByUrl("customers/" + this.customerId, {state: this.customer}).then(r=>{});
       //   this.router.navigateByUrl("customers");
        },
        error: err => {
          this.errorMessage = err.message;
          return throwError(err);
        }
      });
    } else if(curAccount.type == 'SavingAccount'){
      this.accountServie.newSavingAccount(curAccount.balance, curAccount.interestRate, curAccount.customerDTO.id).subscribe({
        next: data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "A new saving bank account has been added to this customerId"+ this.customerId,
              showConfirmButton: false,
              timer: 1500
            });
          this.newAccountFormGroup.reset();
          this.router.navigateByUrl("customers/" + this.customerId, {state: this.customer}).then(r=>{});
        },
        error: err => {
          this.errorMessage = err.message;
          return throwError(err);
        }
      });
    }
  }
}
