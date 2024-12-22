import { FC } from 'react';
import { Link } from 'react-router-dom';

import { TodoModel } from '@/core/models/todo.model.ts';
import { Routes } from '@/router.tsx';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';

interface TodoCartProps {
  todo: TodoModel;
  onDelete: (id: string) => void;
  onCompleted: (todo: TodoModel) => void;
}
export const TodoCart: FC<TodoCartProps> = ({ todo, onDelete, onCompleted }) => {
  return (
    <Card className="mb-4 flex justify-between p-4" key={todo.id}>
      <div className="flex gap-2">
        <Checkbox checked={todo.completed} className="mt-2" onClick={() => onCompleted(todo)} />
        <div className="space-y-1">
          <Link className="font-medium underline" to={`${Routes.TODO}/${todo.id}`}>
            {todo.title}
          </Link>
          <p className="text-sm text-muted-foreground">{todo?.description}</p>
        </div>
      </div>
      <Button onClick={() => onDelete(todo.id)} size="icon" variant="ghost">
        <Trash2 />
      </Button>
    </Card>
  );
};
