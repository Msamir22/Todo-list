import { Timestamp } from '@angular/fire/firestore';

export interface TaskDocument {
  readonly createdDate: Timestamp;
  readonly id: string;
  readonly priority: number;
  readonly status: string;
  readonly title: string;
  readonly userId: string;
}
