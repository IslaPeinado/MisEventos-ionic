import {NgModule} from "@angular/core";
import {ListEventoComponent} from "./list-evento.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {CommonModule, NgForOf} from "@angular/common";

@NgModule({
  declarations: [ListEventoComponent],
  exports: [ListEventoComponent],
  imports: [CommonModule, IonicModule, RouterModule.forChild([{
    path: '',
    component: ListEventoComponent
  }]), NgForOf]
})
export class ListEventoModule {}
