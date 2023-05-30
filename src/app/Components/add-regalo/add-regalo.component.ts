import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegaloService} from "../../../services/regalo.service";

@Component({
  selector: 'app-add-regalo',
  templateUrl: './add-regalo.component.html',
  styleUrls: ['./add-regalo.component.scss'],
})
export class AddRegaloComponent  implements OnInit {

  formRegalo: FormGroup;
  constructor(
    private regaloService: RegaloService
  ) {
    this.formRegalo = new FormGroup({
      fotoRegalo: new FormControl(Validators.required),
      nombreRegalo: new FormControl(Validators.required),
      descripcionRegalo: new FormControl(Validators.required),
      marcaRegalo: new FormControl(Validators.required),
      tallaModeloRegalo: new FormControl(Validators.required),
      precioRegalo: new FormControl(Validators.required),
      enlaceRegalo: new FormControl(Validators.required),
    })
  }

  ngOnInit() {}

  async onSubmit() {
    const response = await this.regaloService.addRegalo(this.formRegalo.value);
    console.log(response);
  }

}
