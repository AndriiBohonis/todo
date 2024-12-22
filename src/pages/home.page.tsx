import { useEffect } from 'react';

import { TodoModel } from '@/core/models/todo.model.ts';
import {
  useDeleteTodoMutation,
  useGetTodoListQuery,
  useUpdateTodoStatusMutation,
} from '@/core/services/todo.ts';
import { useToast } from '@/hooks/use-toast.ts';

import { TodoCart } from '@/components/todo-cart.tsx';

export const HomePage = () => {
  const { toast } = useToast();
  const { data, isLoading } = useGetTodoListQuery();
  const [deleteTodo, { isSuccess: isDeleted }] = useDeleteTodoMutation();
  const [updateTodoStatus, { isSuccess: isCompleted }] = useUpdateTodoStatusMutation();

  useEffect(() => {
    if (isCompleted) {
      toast({
        title: 'Status changed successfully',
        variant: 'default',
      });
    }
  }, [isCompleted]);

  useEffect(() => {
    if (isDeleted) {
      toast({
        title: 'Todo deleted successfully!',
        variant: 'default',
      });
    }
  }, [isDeleted]);

  const onChangeStatus = (todo: TodoModel) => {
    updateTodoStatus({ id: todo.id, completed: !todo.completed });
  };

  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <h1 className="mb-4 text-xl font-semibold"> Your ToDo List</h1>
      {isLoading && <div>Loading...</div>}
      {data?.length ? (
        <ul className="flex w-full max-w-lg flex-col gap-y-4">
          {data.map((todo) => (
            <TodoCart
              key={todo.id}
              onCompleted={onChangeStatus}
              onDelete={deleteTodo}
              todo={todo}
            />
          ))}
        </ul>
      ) : (
        <p>No todos available</p>
      )}
    </div>
  );
};
