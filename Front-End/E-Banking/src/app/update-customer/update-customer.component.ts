import { Component, OnInit } from '@angular/core';
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  errorUpdateMessage!: string;
  updateFormGroup: FormGroup | undefined;
  customerId!: string;
  customer!: Customer;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private fb: FormBuilder,
              private router: Router) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.updateFormGroup = this.fb.group({
      id : this.fb.control(this.customer.id, [Validators.required, Validators.minLength(1)]),
      name : this.fb.control(this.customer.name, [Validators.required, Validators.minLength(5)]),
      email : this.fb.control(this.customer.email, [Validators.required, Validators.email])
    });
  }

  handleUpdateCustomer() {
   let customer: Customer = this.updateFormGroup?.value;

    let confirmUpdate = confirm("Are you sure to update this customer?");
    if(!confirmUpdate)
      return;

    this.customerService.updateCustomer(customer).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Customer has been successfully updated !",
          showConfirmButton: false,
          timer: 1500
        });
        this.updateFormGroup?.reset();
        this.router.navigateByUrl("/customers").then(r => {
        });
      },
      error: err => {
        this.errorUpdateMessage = err.message;
      }
    });
  }
}
