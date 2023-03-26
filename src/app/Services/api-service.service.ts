import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import {DtoDelivery} from "../Dto/DtoDelivery";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseRef = collection(this.fireStore, 'delivery');


  constructor(private fireStore:Firestore) { }

  //delivery
  addDelivery(delivery:DtoDelivery) {
    return addDoc(this.baseRef, delivery);
  }

  getDelivery():Observable<DtoDelivery[]> {
    return collectionData(this.baseRef, {idField: 'id'}) as Observable<DtoDelivery[]>;
  }

  deleteDelivery(id:any) {
    const baseDocRef = doc(this.fireStore, `delivery/${id}`);
    return deleteDoc(baseDocRef);
  }

}
