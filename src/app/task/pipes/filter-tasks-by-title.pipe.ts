import { Pipe, PipeTransform } from '@angular/core';
import { Task, filterTasksByTitle } from '../task.model';

@Pipe({
  name: 'filterTasksByTitle',
})
export class FilterTasksByTitlePipe implements PipeTransform {
  transform(tasks: Task[], title: Task['title']): any {
    return filterTasksByTitle(tasks, title);
  }
}
