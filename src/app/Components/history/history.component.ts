import { Component, OnInit } from '@angular/core';
import {DtoDelivery} from "../../Dto/DtoDelivery";
import {DtoResultDeliveryToday} from "../../Dto/DtoResultDeliveryToday";
import {ApiServiceService} from "../../Services/api-service.service";
import {DateServiceService} from "../../Services/date-service.service";
import {AlertServiceService} from "../../Services/alert-service.service";
import {ExportPdfService} from "../../Services/export-pdf.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  date_filter: any;
  table_total: boolean = true;
  table_total_filter: boolean = false;
  table_list: boolean = true;
  table_list_filter: boolean = false;

  deliveryList:DtoDelivery[] = [];
  deliveryFilterForDate:DtoDelivery[] = [];

  resultDelivery:DtoResultDeliveryToday = {
    "delivery_quantity": 0,
    "base_total": 0,
    "full_delivery": 0,
    "total_spent": 0,
    "delivery_percentage": 0,
    "company_percentage": 0,
    "pocket": 0,
    "total": 0,
  };

  resultFilterDelivery:DtoResultDeliveryToday = {
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
    private alert:AlertServiceService,
    private pdf:ExportPdfService
  ) { }

  ngOnInit(): void {
    this.getDelivery();
    this.getResultDelivery();
  }

  printPdf() {
    let DATA: any = document.getElementById('history_delivery');
    let name_file:string = 'Historial';
    this.pdf.openPDF(DATA, name_file);
    this.alert.alertOk('Descarga satisfactoria');
  }

  showTableTotal() {
    this.table_total = true;
    this.table_total_filter = false;
  }

  showTableTotalFilter() {
    this.table_total_filter = true;
    this.table_total = false;
  }

  showTableList() {
    this.table_list = true;
    this.table_list_filter = false;
  }

  showTableListFilter() {
    this.table_list_filter = true;
    this.table_list = false;
  }

  getDelivery() {
    this.api.getDelivery().subscribe(res=>{
      this.deliveryList = res;
    })
  }

  getResultDelivery() {
    this.api.getDelivery().subscribe(res=>{
      let deliveryList:DtoDelivery[] = res;
      let delivery_quantity:any = deliveryList.length - 1;
      let base_total:number = deliveryList.map(item=>item.base).reduce((count, item)=>count + item, 0);
      let full_delivery:number = deliveryList.map(item=>item.value).reduce((count, item)=>count + item, 0);
      let spent:number = deliveryList.map(item=>item.spent).reduce((count, item)=>count + item, 0);
      let credit:number = deliveryList.map(item=>item.credit).reduce((count, item)=>count + item, 0);
      let total_spent:number = spent + credit;
      let delivery_percentage:number = full_delivery * 0.75;
      let company_percentage:number = full_delivery * 0.25;
      let pocket:number = base_total + full_delivery - total_spent;
      let total:number = base_total + company_percentage - total_spent;

      this.resultDelivery = {
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

  deleteDelivery(id: any) {
    this.api.deleteDelivery(id).then((res)=>{
      //
    }).catch((error)=>{
      this.alert.alertError('Hubo un error');
    })
  }

  filterForDate() {
    if (this.date_filter === undefined) {
      this.alert.alertError('Agrega fecha de búsqueda...');
      return;
    }
    this.api.getDelivery().subscribe(res=>{
      this.deliveryFilterForDate = res.filter(value => value.date === this.date_filter);
      let delivery_quantity:any = this.deliveryFilterForDate.length - 1;
      let base_total:number = this.deliveryFilterForDate.map(item=>item.base).reduce((count, item)=>count + item, 0);
      let full_delivery:number = this.deliveryFilterForDate.map(item=>item.value).reduce((count, item)=>count + item, 0);
      let spent:number = this.deliveryFilterForDate.map(item=>item.spent).reduce((count, item)=>count + item, 0);
      let credit:number = this.deliveryFilterForDate.map(item=>item.credit).reduce((count, item)=>count + item, 0);
      let total_spent:number = spent + credit;
      let delivery_percentage:number = full_delivery * 0.75;
      let company_percentage:number = full_delivery * 0.25;
      let pocket:number = base_total + full_delivery - total_spent;
      let total:number = base_total + company_percentage - total_spent;
      this.resultFilterDelivery = {
        "delivery_quantity": delivery_quantity,
        "base_total": base_total,
        "full_delivery": full_delivery,
        "total_spent": total_spent,
        "delivery_percentage": delivery_percentage,
        "company_percentage": company_percentage,
        "pocket": pocket,
        "total": total,
      }
      this.showTableTotalFilter();
      this.showTableListFilter();
    })
  }

  returnHistory() {
    this.showTableTotal();
    this.showTableList();
  }
}
