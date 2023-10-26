import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {CustomerComponent} from "./customer/customer.component";
import {BankAccountsComponent} from "./bank-accounts/bank-accounts.component";
import {NewAccountComponent} from "./new-account/new-account.component";
import {HomeComponent} from "./home/home.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {MainGuard} from "./guards/main-guard.service";
import {EditProfilComponent} from "./edit-profil/edit-profil.component"
import {AboutComponent} from "./about/about.component";
import {AccountOperationsComponent} from "./account-operations/account-operations.component";
/*const routes: Routes = [
  { path: "customers", component: CustomersComponent },
  { path: "accounts", component: AccountsComponent },
  { path: "new-customer", component: NewCustomerComponent },
  { path: "update-customer/:id", component: UpdateCustomerComponent },
  { path: "customer-accounts/:id", component: CustomerAccountsComponent },
  { path: "customers/:id", component: CustomerComponent },
  { path: "bank-accounts", component: BankAccountsComponent },
  { path: "customers/new-account/:id", component: NewAccountComponent },
  {path :"home",component:HomeComponent},
  {path : "login-page",component:LoginPageComponent}

];*/

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customers", component: CustomersComponent,
    canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "accounts", component: AccountsComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "accounts/:id", component: AccountsComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "new-customer", component: NewCustomerComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "update-customer/:id", component: UpdateCustomerComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "customer-accounts/:id", component: CustomerAccountsComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "bank-accounts", component: BankAccountsComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "customers/new-account/:id", component: NewAccountComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "edit-profil/:id", component: EditProfilComponent, canActivate: [MainGuard],
    canLoad: [MainGuard]
  },
  {
    path: "about", component: AboutComponent,
  },
  {
    path: "account-operations/:id", component: AccountOperationsComponent,canActivate: [MainGuard],
    canLoad: [MainGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

