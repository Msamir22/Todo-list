import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskModule } from './task/task.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./task').then((m) => m.TaskModule),
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => import('./auth').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, TaskModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
