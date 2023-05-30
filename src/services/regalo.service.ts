import { Injectable } from '@angular/core';
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {RegaloInterface} from "../interfaces/regalo.interface";

@Injectable({
  providedIn: 'root'
})
export class RegaloService {

  constructor(
    private firestore: Firestore
  ) { }

  addRegalo(regalo: RegaloInterface){
    const regaloRef= collection(this.firestore, 'regalos')
    return addDoc(regaloRef, regalo);
  }
}
