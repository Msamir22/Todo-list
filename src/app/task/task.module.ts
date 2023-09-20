import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { AuthGuard } from '../core/guards/authorization.guard';
import { SharedModule } from '../shared/shared.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FilterTasksByStatusPipe } from './pipes/filter-tasks-by-status.pipe';
import { FilterTasksByTitlePipe } from './pipes/filter-tasks-by-title.pipe';
import { TaskService } from './services/task.service';

const routes: Routes = [
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    NgbDropdownModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    FilterTasksByStatusPipe,
    FilterTasksByTitlePipe,
    TaskListComponent,
  ],
  providers: [TaskService],
})
export class TaskModule {}
