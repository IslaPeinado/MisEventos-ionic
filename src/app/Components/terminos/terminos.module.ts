import {NgModule} from "@angular/core";
import {TerminosComponent} from "./terminos.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [TerminosComponent],
  exports: [TerminosComponent],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: TerminosComponent}]),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class TerminosModule {}
