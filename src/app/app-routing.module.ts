import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgChartsModule],
  exports: [RouterModule],
  // declarations: [GeolocationComponent]
})
export class AppRoutingModule { }
