import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor() { }

  alertOk(message:string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  alertError(message:string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  }

}
