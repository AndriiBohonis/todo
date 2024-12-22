import { BaseModel } from '@/core/models/base.model.ts';

export interface TodoModel extends BaseModel {
  title: string;
  description: string;
  completed: boolean;
}
