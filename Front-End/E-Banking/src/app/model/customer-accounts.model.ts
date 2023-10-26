import {Customer} from "./customer.model";

export interface Account {
  type:          string;
  id:            string;
  balance:       number;
  createdDate:   Date;
  status:        string;
  customerDTO:   Customer;
  overDraft?:    number;
  interestRate?: number;

}
