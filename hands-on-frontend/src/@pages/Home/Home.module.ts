import { NgModule } from "@angular/core";
import { BreacrumbModule } from "src/@components/Breadcrumb/Breadcrumb.module";
import { HomePage } from "./Home.page";

@NgModule({
  declarations: [HomePage],
  exports: [HomePage],
  imports: [
    BreacrumbModule
  ]
})
export class HomeModule { }
