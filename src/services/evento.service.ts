import {Injectable} from "@angular/core";
import {collection, Firestore, addDoc, collectionData} from "@angular/fire/firestore";
import EventoInterface from "../interface/evento.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  constructor(private firestore: Firestore) {}

  addEvento(evento: EventoInterface) {
    const eventoRef = collection(this.firestore, 'eventos');
    return addDoc(eventoRef, evento);
  }


  getEventos(): Observable<EventoInterface[]> {
    const eventoRef = collection(this.firestore, 'eventos');
    return collectionData(eventoRef, {idField: 'idEvento'}) as Observable<EventoInterface[]>;
  }
}
