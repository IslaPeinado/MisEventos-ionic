import {NgModule} from "@angular/core";
import {ListEventoComponent} from "./list-evento.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {NgForOf} from "@angular/common";

@NgModule({
  declarations: [ListEventoComponent],
  exports: [ListEventoComponent],
  imports: [IonicModule, RouterModule.forChild([{path: '', component: ListEventoComponent}]), NgForOf]
})
export class ListEventoModule {}
