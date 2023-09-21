import { Timestamp } from '@angular/fire/firestore';
import { TaskDocument } from '../utils/firestore.types';
import { getEnumMember } from '../utils/miscellaneous';

export enum TaskStatus {
  Completed = 'Completed',
  Pending = 'Pending',
}

export class Task {
  protected constructor(args: ClassProperties<Task>) {
    this.createdDate = args.createdDate;
    this.id = args.id;
    this.priority = args.priority;
    this.status = args.status;
    this.title = args.title;
    this.userId = args.userId;
  }

  public readonly createdDate: Date;
  public readonly id: string;
  public readonly priority: number;
  public readonly status: TaskStatus;
  public readonly title: string;
  public readonly userId: string;

  public static deserialize(data: TaskDocument): Task {
    return new Task({
      ...data,
      createdDate: data.createdDate.toDate(),
      status: getEnumMember(TaskStatus, data.status),
    });
  }

  public static deserializeList(data: TaskDocument[]): Task[] {
    return data.map((value) => Task.deserialize(value));
  }
}

export interface taskCreationArguments {
  title: string;
  userId: string;
  priority: number;
  id: string;
}

export class TaskCreation implements TaskDocument {
  private constructor(args: ClassProperties<TaskCreation>) {
    this.createdDate = args.createdDate;
    this.id = args.id;
    this.priority = args.priority;
    this.status = args.status;
    this.title = args.title;
    this.userId = args.userId;
  }

  public readonly createdDate: Timestamp;
  public readonly id: string;
  public readonly priority: number;
  public readonly status: string;
  public readonly title: string;
  public readonly userId: string;

  public static deserialize(taskInfo: taskCreationArguments): TaskCreation {
    const { title, userId, priority, id } = taskInfo;

    return new TaskCreation({
      createdDate: Timestamp.now(),
      priority,
      status: TaskStatus.Pending,
      title,
      userId,
      id,
    });
  }
}
