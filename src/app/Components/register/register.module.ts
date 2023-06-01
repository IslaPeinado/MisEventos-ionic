import {NgModule} from "@angular/core";
import {RegisterComponent} from "./register.component";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: RegisterComponent}]),
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RegisterModule {}
