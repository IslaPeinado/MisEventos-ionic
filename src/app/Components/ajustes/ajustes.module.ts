import {NgModule} from "@angular/core";
import {AjustesComponent} from "./ajustes.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AjustesComponent],
  exports: [AjustesComponent],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: AjustesComponent}]),
    FormsModule
  ]
})
export class AjustesModule {}
