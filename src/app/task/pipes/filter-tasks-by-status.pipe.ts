import { Pipe, PipeTransform } from '@angular/core';
import { FilterByStatusOptions } from '../components/task-list/task-list.component';
import { Task, TaskStatus } from '../task.model';

@Pipe({
  name: 'filterTasksByStatus',
})
export class FilterTasksByStatusPipe implements PipeTransform {
  public transform(tasks: Task[], status: FilterByStatusOptions): Task[] {
    switch (status) {
      case FilterByStatusOptions.Completed:
        return tasks.filter((task) => task.status === TaskStatus.Completed);

      case FilterByStatusOptions.Pending:
        return tasks.filter((task) => task.status === TaskStatus.Pending);

      default:
        return tasks;
    }
  }
}
