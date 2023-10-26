import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { CustomerComponent } from './customer/customer.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';
import { NewAccountComponent } from './new-account/new-account.component';
import {AlertComponent} from "./alert/alert.component";
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { AboutComponent } from './about/about.component';
import { AccountOperationsComponent } from './account-operations/account-operations.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomersComponent,
    AccountsComponent,
    NewCustomerComponent,
    UpdateCustomerComponent,
    CustomerAccountsComponent,
    CustomerComponent,
    BankAccountsComponent,
    NewAccountComponent,
    AlertComponent,
    HomeComponent,
    LoginPageComponent,
    EditProfilComponent,
    AboutComponent,
    AccountOperationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
