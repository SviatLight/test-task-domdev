import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from '../types/ITodo';

export const todosAPI = createApi({
  reducerPath: 'todosAPI',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getTodos: build.query<ITodo[], void>({
      query: () => 'todos',
      providesTags: ['Todos'],
    }),
    addTodo: build.mutation<ITodo, ITodo>({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: build.mutation({
      query: (body: ITodo) => ({
        url: `todos/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosAPI;
