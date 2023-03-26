import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertServiceService} from "../../Services/alert-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user_name: string | null  = sessionStorage.getItem('userName');

  constructor(
    private router:Router,
    private alert:AlertServiceService
  ) { }

  ngOnInit(): void {
    if (this.user_name === null) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    sessionStorage.clear();
    this.alert.alertOk('Has cerrado tu sesión correctamente, vuelve pronto');
    this.router.navigate(['/login']);
  }
}
