import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, firstValueFrom, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { DeleteConfirmModalComponent } from 'src/app/shared/components/delete-confirm-modal/delete-confirm-modal.component';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../task.model';

export enum FilterByStatusOptions {
  Completed = 'Completed',
  Pending = 'Pending',
  All = 'All',
}

@UntilDestroy()
@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  public constructor(
    private readonly taskService: TaskService,
    private readonly fb: NonNullableFormBuilder,
    private readonly auth: AuthService,
    private readonly modalService: NgbModal,
    private readonly toastService: ToastService
  ) {}

  public readonly TaskStatus = TaskStatus;

  public selectedStatus: FilterByStatusOptions = FilterByStatusOptions.All;

  public readonly filterByStatuesOptions = Object.values(FilterByStatusOptions);

  public readonly addTaskControl = this.fb.control('', [
    Validators.minLength(1),
    Validators.required,
  ]);

  public readonly searchCtrl = this.fb.control('', Validators.minLength(1));

  public readonly tasks$: Observable<Task[]> = this.taskService.tasks$;

  public readonly lowestPriorityNumber$ = this.tasks$.pipe(
    map((tasks) =>
      tasks.length
        ? tasks.reduce((prev, curr) => {
            if (prev.priority > curr.priority) {
              return prev;
            } else return curr;
          }).priority
        : 0
    )
  );

  public onFilterByStatus(status: FilterByStatusOptions): void {
    this.selectedStatus = status;
  }

  public async onDrop(event: CdkDragDrop<Task[]>, tasks: Task[]) {
    console.log(event);
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);

    const firstTask = tasks[event.previousIndex];
    const secondTask = tasks[event.currentIndex];

    await this.taskService.update(firstTask.id, {
      priority: secondTask.priority,
    });

    await this.taskService.update(secondTask.id, {
      priority: firstTask.priority,
    });
  }

  public async createTask(): Promise<void> {
    const lowestPriorityNumber = await firstValueFrom(
      this.lowestPriorityNumber$
    );

    await this.taskService.create({
      title: this.addTaskControl.value,
      priority: lowestPriorityNumber + 1,
      userId: this.auth.currentUser.uid,
    });

    this.addTaskControl.reset();

    this.toastService.show('Task Created Succesfully', {
      success: true,
    });
  }

  public async onStatusChange(taskId: string, event: Event): Promise<void> {
    const checked = (event.target as HTMLInputElement).checked;
    await this.taskService.update(taskId, {
      status: checked ? TaskStatus.Completed : TaskStatus.Pending,
    });

    this.toastService.show(`Task Status Updated Succesfully`, {
      success: true,
    });
  }

  public openDeleteModal(task: Task): void {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent);
    modalRef.componentInstance.modalTitle = 'Task Deletion';
    modalRef.componentInstance.confirmMessage =
      'Are you sure you want to delete task';
    modalRef.componentInstance.itemToDelete = task.title;

    modalRef.closed
      .pipe(untilDestroyed(this))
      .subscribe(async (value: boolean) => {
        if (value) {
          await this.taskService.detele(task.id);

          this.toastService.show('Task Deleted Succesfully', {
            success: true,
          });
        }
      });
  }
}
