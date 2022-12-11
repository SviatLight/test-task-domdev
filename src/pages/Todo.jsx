import React, { useState } from 'react';
import TodoItem from '../components/TodoItem';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../redux/todosAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Todo = () => {
  const { data: todos, isLoading: isLoadingTodos, isError: isErrorTodos } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [todoState, setTodoState] = useState({
    task: '',
    status: false,
  });
  const [mode, setMode] = useState(true);
  const date = new Date();
  const day = date.getDay();

  const changeTodo = (todoItem) => {
    setMode(false);
    setTodoState(todoItem);
  };

  const updateTodoList = (todoAction, toastText, setMode) => {
    if (!todoState.task) {
      toast.error('Your task field is empty!', {
        closeOnClick: true,
        theme: 'light',
      });
      return;
    }
    todoAction(todoState);
    setMode?.(true);
    setTodoState({
      task: '',
      status: false,
    });
    toast.success(`${toastText}`, {
      closeOnClick: true,
      theme: 'light',
    });
  };

  const deleteTodoItem = (id) => {
    deleteTodo(id);
    toast.success('Your task deleted success!', {
      closeOnClick: true,
      theme: 'light',
    });
  };

  if (isErrorTodos) {
    return <p>Something went wrong! F5</p>;
  }

  return (
    <div className="bg-[#3da2c3] h-screen flex justify-center items-center">
      <div className="max-w-[466px] w-full h-[479px] bg-white mx-auto my-0 rounded-md p-[24px]">
        <h1 className="text-[1.5rem] font-medium">ToDo List</h1>
        <p>{days[day]}</p>
        <div className="my-[44px] h-[215px] overflow-scroll scroll-hide">
          {!isLoadingTodos ? (
            todos.map((item) => (
              <TodoItem
                key={item.id}
                {...item}
                changeTodo={changeTodo}
                deleteTodoItem={deleteTodoItem}
              />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div className="lds-dual-ring"></div>
            </div>
          )}
        </div>
        <div className="py-[35px]">
          <input
            type="text"
            className="max-w-[70%] w-full p-2 text-[1.1rem]"
            value={todoState.task}
            name="task"
            placeholder={mode ? 'Add new todo ...' : 'Edit todo ...'}
            onChange={(event) =>
              setTodoState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
            }
          />
          {mode ? (
            <Button
              className="bg-[#3da2c3]"
              text="Add new task"
              onClick={() => updateTodoList(addTodo, 'Your task added success!')}
            />
          ) : (
            <Button
              className="bg-[#58c33d]"
              text="Edit task"
              onClick={() => updateTodoList(updateTodo, 'Your task updated success!', setMode)}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Todo;
