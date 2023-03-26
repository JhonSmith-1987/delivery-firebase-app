import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertServiceService} from "../../Services/alert-service.service";
import {DtoDelivery} from "../../Dto/DtoDelivery";
import {DateServiceService} from "../../Services/date-service.service";
import {ApiServiceService} from "../../Services/api-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {

  formDelivery: FormGroup;

  constructor(
    private fb:FormBuilder,
    private alert:AlertServiceService,
    private today:DateServiceService,
    private api:ApiServiceService,
    private router:Router
  ) {
    this.formDelivery = this.fb.group({
      detail: [ '', Validators.required ],
      value: [ 0 , Validators.required ],
      type: [ 'payment', Validators.required],
      spent: [ 0, Validators.required],
      base: [ 0, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  addDelivery() {
    let credit:number = 0
    if (this.formDelivery.status === "INVALID") {
      this.alert.alertError('El campo detalle del domicilio está vacío');
      return;
    }
    if (this.formDelivery.value.value === 0) {
      this.alert.alertError('El campo valor del domicilio debe ser diferente a cero');
      return;
    }
    if (this.formDelivery.value.type === 'credit') {
      credit = this.formDelivery.value.value;
    }
    let delivery:DtoDelivery = {
      "type_transaction": 'delivery',
      "date": this.today.todayDate(),
      "detail": this.formDelivery.value.detail,
      "base": this.formDelivery.value.base,
      "value": this.formDelivery.value.value,
      "credit": credit,
      "spent": this.formDelivery.value.spent,
    }
    this.api.addDelivery(delivery).then((res)=>{
      this.alert.alertOk('Domicilio guardado con éxito');
      this.router.navigate(['/delivery']);
    }).catch((error)=>{
      this.alert.alertError('hubo un error, intentar de nuevo');
    })
  }
}
