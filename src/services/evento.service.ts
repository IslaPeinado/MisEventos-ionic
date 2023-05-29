import {Injectable} from '@angular/core';
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {EventoInterface} from "../interfaces/evento.interface";


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private firestore: Firestore
  ) { }

  addEvento(evento: EventoInterface) {
    const eventoRef = collection(this.firestore, 'eventos');
    return addDoc(eventoRef, evento);
  }

  //getEvento(): Observable<EventoInterface[]> {
//
  //}

}
