'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useCreateTodoMutation,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from '@/core/services/todo.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { Routes } from '@/router.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea.tsx';

const TodoSchema = z.object({
  title: z.string().min(2, {
    message: 'Title is required',
  }),
  description: z.string().nullable(),
  completed: z.boolean(),
});

export type TodoDto = z.infer<typeof TodoSchema>;

export const TodoForm = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const { data } = useGetTodoQuery(id, {
    skip: !id,
  });
  const [createTodo, { isSuccess: isCreated }] = useCreateTodoMutation();
  const [updateTodo, { isSuccess: isUpdated }] = useUpdateTodoMutation();
  const navigate = useNavigate();

  const form = useForm<TodoDto>({
    resolver: zodResolver(TodoSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      completed: false,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (data && id) {
      reset(data);
    }
    if (!id) {
      reset({
        title: '',
        description: '',
        completed: false,
      });
    }
  }, [id, data]);

  useEffect(() => {
    if (isCreated || isUpdated) {
      navigate(Routes.HOME);
    }
  }, [isCreated, isUpdated]);

  const onSubmit = (values: TodoDto) => {
    if (id) {
      updateTodo({ id, updatedTodo: values });
    } else {
      createTodo(values);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      toast({
        title: id ? 'Todo updated successfully!' : 'Todo created successfully!',
        variant: 'default',
      });
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <p className="mb-4 text-xl font-semibold">{id ? 'Update Todo' : 'New Todo'} </p>
      <Form {...form}>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="title"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Description"
                    {...field}
                    value={field?.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
            name="description"
          />
          <Button className="w-full" type="submit">
            {id ? 'Update' : 'Create'}
          </Button>
        </form>
      </Form>
    </>
  );
};
