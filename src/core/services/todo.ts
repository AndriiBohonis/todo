import { TodoModel } from '@/core/models/todo.model.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TodoDto } from '@/components/todo-form.tsx';

const BASE_URL = 'http://localhost:3000/';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodoList: builder.query<TodoModel[], void>({
      query: () => 'todos',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Todos', id }) as const),
              { type: 'Todos', id: 'LIST' },
            ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    getTodo: builder.query<TodoModel | undefined, string | undefined>({
      query: (id) => {
        if (!id) {
          return '';
        }
        return `todos/${id}`;
      },
    }),

    createTodo: builder.mutation<TodoModel, Partial<TodoDto>>({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),

    updateTodo: builder.mutation<TodoModel, { id: string; updatedTodo: Partial<TodoDto> }>({
      query: ({ id, updatedTodo }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: updatedTodo,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Todos', id }],
    }),

    updateTodoStatus: builder.mutation<TodoModel, { id: string; completed: boolean }>({
      query: ({ id, completed }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { completed },
      }),

      invalidatesTags: (_, __, { id }) => [{ type: 'Todos', id }],
    }),

    deleteTodo: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Todos', id }],
    }),
  }),
});

export const {
  useGetTodoListQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
} = todoApi;
