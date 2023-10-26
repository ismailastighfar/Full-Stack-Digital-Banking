import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})



export class AlertComponent implements OnInit {

  constructor() { }


  @Input() alertType!: AlertType ;
  @Input() alertMessage: String | undefined;
  alertTypeStr: String = "info";
  ngOnInit(): void {
    this.alertTypeStr = AlertType[this.alertType];

  }

}





export enum AlertType {
  danger,
  primary,
  secondary ,
  success ,
  warning ,
  info
}


