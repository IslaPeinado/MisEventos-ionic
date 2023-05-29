import { Component, OnInit, Input } from '@angular/core';
import {RegaloModel} from "../../../models/regalo.model";

@Component({
  selector: 'app-one-regalo',
  templateUrl: './one-regalo.component.html',
  styleUrls: ['./one-regalo.component.scss'],
})
export class OneRegaloComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() regalo!: RegaloModel;

}
