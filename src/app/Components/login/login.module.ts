import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [IonicModule, RouterModule.forChild([{path: '', component: LoginComponent}]) ]
})
export class LoginModule {}
