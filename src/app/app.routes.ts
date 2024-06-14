import { Routes, RouterModule } from '@angular/router';
import { ItemService } from './item.service';
import { NgModule } from '@angular/core';

export const routes: Routes = [{ path: 'items/:id', component: ItemService }];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }