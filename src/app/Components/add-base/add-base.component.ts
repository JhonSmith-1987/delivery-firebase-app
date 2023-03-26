import { Component, OnInit } from '@angular/core';
import {DtoDelivery} from "../../Dto/DtoDelivery";
import {DateServiceService} from "../../Services/date-service.service";
import {ApiServiceService} from "../../Services/api-service.service";
import {AlertServiceService} from "../../Services/alert-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-base',
  templateUrl: './add-base.component.html',
  styleUrls: ['./add-base.component.css']
})
export class AddBaseComponent implements OnInit {

  base: number = 70000;
  detail: string = 'base inicial';

  constructor(
    private today:DateServiceService,
    private api:ApiServiceService,
    private alert:AlertServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  addBase() {
    let delivery:DtoDelivery = {
      "type_transaction": 'base',
      "date": '2023-03-24',
      "detail": this.detail,
      "base": this.base,
      "value": 0,
      "credit": 0,
      "spent": 0
    }
    this.api.addDelivery(delivery).then((res)=>{
      this.alert.alertOk('Se agrego base correctamente');
      this.router.navigate(['/delivery']);
    }).catch((error)=>{
      this.alert.alertError('hubo un error, intentar de nuevo');
    })
  }
}
