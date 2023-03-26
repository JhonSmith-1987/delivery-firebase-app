import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertServiceService} from "../../Services/alert-service.service";
import {DtoLogin} from "../../Dto/DtoLogin";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  login:DtoLogin = {
    "email": 'john@gmail.com',
    "password": 'kellyteamo',
    "name": 'John Mora'
  }

  constructor(
    private fb:FormBuilder,
    private alert:AlertServiceService,
    private router:Router
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  loginIn() {
    if (this.formLogin.status === "INVALID") {
      this.alert.alertError('Debes llenar todos los campos');
      return;
    }
    let dataFormLogin:DtoLogin = this.formLogin.value;
    if (this.login.password != dataFormLogin.password) {
      this.alert.alertError('Contraseña invalida');
      return;
    }
    sessionStorage.setItem('userName', this.login.name);
    this.alert.alertOk('Bienvenido ' + this.login.name);
    this.router.navigate(['/home']);
  }
}
