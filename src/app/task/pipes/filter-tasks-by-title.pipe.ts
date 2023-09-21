import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task.model';

@Pipe({
  name: 'filterTasksByTitle',
})
export class FilterTasksByTitlePipe implements PipeTransform {
  transform(tasks: Task[], title: Task['title']): Task[] {
    return tasks.filter((task) => task.title.includes(title));
  }
}
