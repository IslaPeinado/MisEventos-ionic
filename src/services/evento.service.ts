import { Injectable } from '@angular/core';
import {collection, Firestore, addDoc} from "@angular/fire/firestore";
import EventoInterface from "../interfaces/add-evento.interface";

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private firestore: Firestore
  ) { }

  addEvento( evento : EventoInterface) {
    const eventoRef = collection(this.firestore, 'eventos');
    return addDoc(eventoRef, evento);
  }

  getEventos() {}

  deleteEvento() {}
}
