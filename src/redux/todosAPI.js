import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosAPI = createApi({
  reducerPath: 'todosAPI',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => 'todos',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todos', id })), { type: 'Todos', id: 'LIST' }]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    addTodo: build.mutation({
      query: (body) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    updateTodo: build.mutation({
      query: (body) => ({
        url: `todos/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosAPI;
