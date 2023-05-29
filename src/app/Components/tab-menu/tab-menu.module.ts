import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {TabMenuComponent} from "./tab-menu.component";

@NgModule({
  declarations: [TabMenuComponent],
  exports: [TabMenuComponent],
  imports: [IonicModule, RouterModule.forChild([{path: '', component: TabMenuComponent}])]
})
export class TabMenuModule {}
