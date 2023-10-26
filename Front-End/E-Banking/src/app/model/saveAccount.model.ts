import {Customer} from "./customer.model";

export interface CurAccount {
  type:          string;
  id:             number;
  balance:       number;
  createdDate:   Date;
  status:        string;
  customerDTO:   Customer;
  overDraft:    number;
  interestRate: number;


}
