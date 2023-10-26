import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  editFormGroup!: FormGroup;
  errorEditMessage!: string;


  constructor(private fb: FormBuilder, private serviceCustomer: CustomerService, private router: ActivatedRoute, private routerNav: Router) {
  }

  ngOnInit(): void {
    this.editFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.email]),
      id: this.fb.control(null),
    })
    this.getCustomer();
  }

  handleEditProfile() {
    let customer: Customer = this.editFormGroup.value;
    customer.id = this.router.snapshot.params['id'];
    return this.serviceCustomer.updateCustomer(customer).subscribe(
      {
        next: data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Your Informations has been successfully updated !",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: err => {
          this.errorEditMessage = err.message;
        }
      }
    );
  }

  private getCustomer() {
    let customer: Customer;
    return this.serviceCustomer.getCustomerById(this.router.snapshot.params['id']).subscribe(
      {
        next: data => {
          console.log(data)
          customer = data
          console.log(customer)
          this.editFormGroup.patchValue({
            email: customer.email,
            name: customer.name,
          })
        },
        error: err => {
        }
      }
    );
  }

}
