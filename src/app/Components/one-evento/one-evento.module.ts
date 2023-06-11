import {NgModule} from "@angular/core";
import {OneEventoComponent} from "./one-evento.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";


@NgModule({
  declarations: [OneEventoComponent],
  exports: [OneEventoComponent],
  imports: [IonicModule, RouterModule.forChild([{path: '', component: OneEventoComponent}]), NgForOf, NgIf]
})
export class OneEventoModule {}
