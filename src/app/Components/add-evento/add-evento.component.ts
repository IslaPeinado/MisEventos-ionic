import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
})
export class AddEventoComponent  implements OnInit {

  //imagePath: string;
//
  //onFileSelected(event: any) {
  //  const file: File = event.target.files[0];
  //  const reader = new FileReader();
//
  //  reader.onload = (e: any) => {
  //    this.imagePath = e.target.result;
  //  };
//
  //  reader.readAsDataURL(file);
  //}
//
  //openFileInput() {
  //  const fileInput: HTMLInputElement = document.querySelector('#img');
  //  fileInput.click();
  //}

  constructor() { }

  ngOnInit() {}

}
