import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./Components/home/home.component";
import {HistoryComponent} from "./Components/history/history.component";
import {DeliveryComponent} from "./Components/delivery/delivery.component";
import {LoginComponent} from "./Components/login/login.component";
import {AddBaseComponent} from "./Components/add-base/add-base.component";
import {AddDeliveryComponent} from "./Components/add-delivery/add-delivery.component";

const routes: Routes = [
  { path:"home", component: HomeComponent },
  { path:"login", component: LoginComponent },
  { path:"delivery", component: DeliveryComponent },
  { path:"history", component: HistoryComponent },
  { path:"add-base", component: AddBaseComponent },
  { path:"add-delivery", component: AddDeliveryComponent },
  { path:"", redirectTo:"login", pathMatch:"full" },
  { path:"**", redirectTo:"login", pathMatch:"full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
