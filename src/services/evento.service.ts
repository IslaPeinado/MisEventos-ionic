import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import EventoInterface from "../interface/evento.interface";
import RegaloInterface from "../interface/regalo.interface";
import {Storage} from '@angular/fire/storage';
import {UserService} from "./user.service";
import {Auth, User} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  currentUserSubject: BehaviorSubject<User | null>;
  private imagenes: any[];

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private userService: UserService,
    private storage: Storage
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.imagenes = [];
  }

// ------------------ USUARIOS ------------------

  getCurrentUser(): BehaviorSubject<User | null> {
    return this.currentUserSubject;
  }

// ------------------ EVENTOS ------------------

  addEvento(evento: EventoInterface, regalo: RegaloInterface) {
    const user = this.auth.currentUser; // Obtener el usuario actualmente autenticado
    if (user) {
      evento.usuarioId = user.uid; // Asignar el ID del usuario al evento
      const eventoRef = collection(this.firestore, 'eventos');
      return addDoc(eventoRef, evento);
      if (evento.regalos != null) {
        evento.idEvento = evento.idEvento;
        const regaloRef = collection(this.firestore, `eventos/${evento.idEvento}/regalos`);
        return addDoc(regaloRef, regalo);
      }
    } else {
      return Promise.reject(new Error('No hay usuario autenticado')); // Manejar el caso de que no haya usuario autenticado
    }
  }

  //addEvento(evento: EventoInterface) {
  //  const eventoRef = collection(this.firestore, 'eventos');
  //  return addDoc(eventoRef, evento);
  //}

  getEventos(): Observable<EventoInterface[]> {
    const eventoRef = collection(this.firestore, 'eventos');
    return collectionData(eventoRef, {idField: 'idEvento'}) as Observable<EventoInterface[]>;
  }


  getEventoByIdEvento(idEvento: string) {
    const eventoRef = doc(this.firestore, `eventos/${idEvento}`);
    return getDoc(eventoRef);
  }

  deleteEvento(idEvento: string) {
    const eventoRef = doc(this.firestore, `eventos/${idEvento}`);
    return deleteDoc(eventoRef);
  }




// ------------------ REGALOS ------------------
  addRegalo(regalo: RegaloInterface) {
    const regaloRef = collection(this.firestore, `eventos/${regalo.idEvento}/regalos`);
    return addDoc(regaloRef, regalo);
  }

  getRegalosByIdEventoAndIdRegalo(idEvento: string, idRegalo: string) {
    const regaloRef = doc(this.firestore, `eventos/${idEvento}/regalos/${idRegalo}`);
    return getDoc(regaloRef);
  }

  deleteRegalo(idEvento: string, idRegalo: string) {
    const regaloRef = doc(this.firestore, `eventos/${idEvento}/regalos/${idRegalo}`);
    return deleteDoc(regaloRef);
  }


// ------------------ IMAGENES ------------------

  //uploadImage($event: any) {
  //  const file = $event.target.files[0];
  //  console.log(file);
//
  //  const imgRef = ref(this.storage, `imagenes/${file.name}`);
//
  //  uploadBytes(imgRef, file)
  //    .then(response => {
  //      console.log(response)
  //      this.getImages();
  //    })
  //    .catch(error => console.log(error));
  //}
//
  //getImages() {
  //  const imagesRef = ref(this.storage, 'images');
//
  //  listAll(imagesRef)
  //    .then(async response => {
  //      console.log(response);
  //      this.imagenes = [];
  //      for (let item of response.items) {
  //        const url = await getDownloadURL(item);
  //        this.imagenes.push(url);
  //      }
  //    })
  //    .catch(error => console.log(error));
  //}
//

}
