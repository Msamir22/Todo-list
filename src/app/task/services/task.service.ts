import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TaskDocument } from 'src/app/utils/firestore.types';
import { Task, TaskCreation, taskCreationArguments } from '../task.model';

@Injectable()
export class TaskService {
  public constructor(
    private readonly firestoreService: AngularFirestore,
    private readonly auth: AuthService
  ) {}

  private readonly tasksCollectionRef =
    this.firestoreService.collection<TaskDocument>('tasks');

  public tasks$: Observable<Task[]> = this.auth.currentUser$.pipe(
    switchMap((user) =>
      this.firestoreService
        .collection<TaskDocument>('tasks', (ref) =>
          ref.where('userId', '==', user?.uid).orderBy('priority', 'asc')
        )
        .valueChanges()
    ),
    map((tasks) => Task.deserializeList(tasks))
  );

  public create(task: Omit<taskCreationArguments, 'id'>): Promise<void> {
    const docId = this.firestoreService.createId();
    const newTask = TaskCreation.deserialize({ ...task, id: docId });
    return this.tasksCollectionRef.doc(docId).set({ ...newTask });
  }

  public update(id: string, task: Partial<Task>): Promise<void> {
    return this.tasksCollectionRef.doc<Task>(id).update(task);
  }

  public detele(id: string): Promise<void> {
    return this.tasksCollectionRef.doc(id).delete();
  }
}
