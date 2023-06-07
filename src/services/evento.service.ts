import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, DocumentData, Firestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import EventoInterface from "../interface/evento.interface";
import RegaloInterface from "../interface/regalo.interface";
import {Auth, User} from "@angular/fire/auth";
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  currentUserSubject: BehaviorSubject<User | null>;


  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
  }

  // ------------------ USUARIOS ------------------

  getCurrentUser(): BehaviorSubject<User | null> {
    return this.currentUserSubject;
  }

  // ------------------ EVENTOS ------------------

  addEvento(evento: EventoInterface) {
    const user = this.auth.currentUser; // Obtener el usuario actualmente autenticado
    if (user) {
      evento.anfitrionId = user.uid; // Asignar el ID del usuario al evento
      const eventoRef = collection(this.firestore, 'eventos');
      return addDoc(eventoRef, evento);
    } else {
      return Promise.reject(new Error('No hay usuario autenticado')); // Manejar el caso de que no haya usuario autenticado
    }
  }

  getEventos(): Observable<EventoInterface[]> {
    const eventoRef = collection(this.firestore, 'eventos');
    return collectionData(eventoRef, { idField: 'idEvento' }) as Observable<EventoInterface[]>;
  }

  getEventosAnfitrion(): Observable<EventoInterface[]> {
    const user = this.auth.currentUser; // Obtener el usuario actualmente autenticado
    if (user) {
      const eventoRef = collection(this.firestore, 'eventos');
      return collectionData(eventoRef, { idField: 'idEvento' }).pipe(
        switchMap((eventos: DocumentData[]) => {
          const eventosAnfitrion = eventos.filter(evento => evento['anfitrionId'] === user.uid) as EventoInterface[];
          if (eventosAnfitrion.length > 0) {
            return throwError(eventosAnfitrion);
          } else {
            return throwError(new Error('No tienes permiso para ver estos eventos')); // Manejar el caso de que el usuario no sea el creador del evento
          }
        }),
        catchError(() => {
          return throwError(new Error('No hay usuario autenticado')); // Manejar el caso de que no haya usuario autenticado
        })
      );
    } else {
      return throwError(new Error('No hay usuario autenticado')); // Manejar el caso de que no haya usuario autenticado
    }
  }

  //getEventosInvitado(): Observable<EventoInterface[]> {
  //  const user = this.auth.currentUser; // Obtener el usuario actualmente autenticado
  //  if (user) {
  //    const eventoRef = collection(this.firestore, 'eventos');
  //    return collectionData(eventoRef, { idField: 'idEvento' }).pipe(
  //      switchMap((eventos: DocumentData[]) => {
  //        const eventosInvitado = eventos.filter(evento => evento['invitadoId'] === user.uid) as EventoInterface[];
  //        if (eventosInvitado.length > 0) {
  //          return throwError(eventosInvitado);
  //        } else {
  //          return throwError(new Error('No tienes permiso para ver estos eventos')); // Manejar el caso de que el usuario no sea el creador del evento
  //        }
  //      }),
  //      catchError(() => {
  //        return throwError(new Error('No hay usuario autenticado')); // Manejar el caso de que no haya usuario autenticado
  //      })
  //    );
  //  } else {
  //    return throwError(new Error('No hay usuario autenticado')); // Manejar el caso de que no haya usuario autenticado
  //  }
  //}

  //deleteEvento(evento: EventoInterface) {
  //  const user = this.auth.currentUser; // Obtener el usuario actualmente autenticado
  //  if (user) {
  //    if (user.uid === evento.anfitrionId) { // Verificar que el usuario autenticado sea el creador del evento
  //      const eventoRef = doc(this.firestore, `eventos/${evento.idEvento}`);
  //      return deleteDoc(eventoRef);
  //    } else {
  //      return Promise.reject(new Error('No tienes permiso para eliminar este evento')); // Manejar el caso de que el usuario no sea el creador del evento
  //    }
  //  } else {
  //    return Promise.reject(new Error('No hay usuario autenticado')); // Manejar el caso de que no haya usuario autenticado
  //  }
  //}

  // ------------------ REGALOS ------------------
  addRegalo(regalo: RegaloInterface) {
    const user = this.auth.currentUser; // Obtener el usuario actualmente autenticado
    if (user) {
      const regaloRef = collection(this.firestore, `eventos/${regalo.idEvento}/regalos`);
      return addDoc(regaloRef, regalo);
    } else {
      return Promise.reject(new Error('No hay usuario autenticado')); // Manejar el caso de que no haya usuario autenticado
    }
  }

  //getRegalos(evnto: EventoInterface): Observable<RegaloInterface[]> {
  //  const regaloRef = collection(this.firestore, `eventos/${evnto.idEvento}regalos`);
  //  return collectionData(regaloRef, { idField: 'idRegalo' }) as Observable<RegaloInterface[]>;
  //}

  //deleteRegalo(regalo: RegaloInterface, evnto: EventoInterface) {
  //  const regaloRef = doc(this.firestore, `eventos/${regalo.idEvento}/regalos/${regalo.idRegalo}`);
  //  return deleteDoc(regaloRef);
  //}

}
