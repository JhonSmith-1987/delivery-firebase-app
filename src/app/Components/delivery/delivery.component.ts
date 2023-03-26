import { Component, OnInit } from '@angular/core';
import {DtoDelivery} from "../../Dto/DtoDelivery";
import {ApiServiceService} from "../../Services/api-service.service";
import {DateServiceService} from "../../Services/date-service.service";
import {DtoResultDeliveryToday} from "../../Dto/DtoResultDeliveryToday";
import {AlertServiceService} from "../../Services/alert-service.service";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  deliveryListToday:DtoDelivery[] = [];

  resultDeliveryToday:DtoResultDeliveryToday = {
    "delivery_quantity": 0,
    "base_total": 0,
    "full_delivery": 0,
    "total_spent": 0,
    "delivery_percentage": 0,
    "company_percentage": 0,
    "pocket": 0,
    "total": 0,
  };

  constructor(
    private api:ApiServiceService,
    private date:DateServiceService,
    private alert:AlertServiceService
  ) { }

  ngOnInit(): void {
    this.getDelivery();
    this.getResultDelivery();
  }

  getResultDelivery() {
    this.api.getDelivery().subscribe(res=>{
      let deliveryListToday:DtoDelivery[] = res.filter(value => value.date === this.date.todayDate());
      let delivery_quantity:any = deliveryListToday.length - 1;
      let base_total:number = deliveryListToday.map(item=>item.base).reduce((count, item)=>count + item, 0);
      let full_delivery:number = deliveryListToday.map(item=>item.value).reduce((count, item)=>count + item, 0);
      let spent:number = deliveryListToday.map(item=>item.spent).reduce((count, item)=>count + item, 0);
      let credit:number = deliveryListToday.map(item=>item.credit).reduce((count, item)=>count + item, 0);
      let total_spent:number = spent + credit;
      let delivery_percentage:number = full_delivery * 0.75;
      let company_percentage:number = full_delivery * 0.25;
      let pocket:number = base_total + full_delivery - total_spent;
      let total:number = base_total + company_percentage - total_spent;

      this.resultDeliveryToday = {
        "delivery_quantity": delivery_quantity,
        "base_total": base_total,
        "full_delivery": full_delivery,
        "total_spent": total_spent,
        "delivery_percentage": delivery_percentage,
        "company_percentage": company_percentage,
        "pocket": pocket,
        "total": total,
      }
    })
  }

  getDelivery() {
    this.api.getDelivery().subscribe(res=>{
      this.deliveryListToday = res.filter(value => value.date === this.date.todayDate());
    })
  }

  deleteDelivery(id: any) {
    this.api.deleteDelivery(id).then((res)=>{
      //
    }).catch((error)=>{
      this.alert.alertError('Hubo un error')
    })
  }
}
