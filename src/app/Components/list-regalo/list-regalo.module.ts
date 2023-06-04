import {NgModule} from "@angular/core";
import {ListRegaloComponent} from "./list-regalo.component";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ListRegaloComponent],
  exports: [ListRegaloComponent],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: ListRegaloComponent}]),
    ReactiveFormsModule
  ]
})
export class ListRegaloModule {}
