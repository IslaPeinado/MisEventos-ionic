import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-regalo',
  templateUrl: './add-regalo.component.html',
  styleUrls: ['./add-regalo.component.scss'],
})
export class AddRegaloComponent  implements OnInit {

  formRegalo: FormGroup;
  constructor() {
    this.formRegalo = new FormGroup({

    })
  }

  ngOnInit() {}

}
