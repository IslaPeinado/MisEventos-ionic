import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, where} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import EventoInterface from "../interface/evento.interface";
import RegaloInterface from "../interface/regalo.interface";
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private imagenes: any[];

  constructor(
    private firestore: Firestore,
    private storage: Storage) {
    this.imagenes = [];
  }


// ------------------ EVENTOS ------------------
  addEvento(evento: EventoInterface) {
    const eventoRef = collection(this.firestore, 'eventos');
    return addDoc(eventoRef, evento);
  }

  getEventos(): Observable<EventoInterface[]> {
    const eventoRef = collection(this.firestore, 'eventos');
    return collectionData(eventoRef, {idField: 'idEvento'}) as Observable<EventoInterface[]>;
  }



  deleteEvento(evento: EventoInterface) {
    const eventoRef = doc(this.firestore, 'eventos/${idEvento}');
    return deleteDoc(eventoRef);
  }


// ------------------ REGALOS ------------------
  addRegalo(regalo: RegaloInterface) {
    const regaloRef = collection(this.firestore, `eventos/${regalo.idEvento}/regalos`);
    return addDoc(regaloRef, regalo);
  }

  getRegalos(evnto: EventoInterface): Observable<RegaloInterface[]> {
    const regaloRef = collection(this.firestore, `eventos/${evnto.idEvento}regalos`);
    return collectionData(regaloRef, {idField: 'idRegalo'}) as Observable<RegaloInterface[]>;
  }

  deleteRegalo(regalo: RegaloInterface, evnto: EventoInterface) {
    const regaloRef = doc(this.firestore, `eventos/${regalo.idEvento}/regalos/${regalo.idRegalo}`);
    return deleteDoc(regaloRef);
  }


// ------------------ IMAGENES ------------------

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `imagenes/${file.name}`);

    uploadBytes(imgRef, file)
      .then(response => {
        console.log(response)
        this.getImages();
      })
      .catch(error => console.log(error));

  }

  getImages() {
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.imagenes = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.imagenes.push(url);
        }
      })
      .catch(error => console.log(error));
  }


}
