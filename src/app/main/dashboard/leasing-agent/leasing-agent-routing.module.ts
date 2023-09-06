import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoucheListComponent } from './couches/couche-list/couche-list.component';

const routes: Routes = [
    {
        path: 'vehicles', component: CoucheListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeasingAgentRoutingModule { }
