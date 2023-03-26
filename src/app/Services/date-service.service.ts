import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  today:Date = new Date();
  pipe = new DatePipe('en-US');

  constructor() { }

  todayDate() {
    return this.pipe.transform(Date.now(), 'yyyy-MM-dd');
  }

}
