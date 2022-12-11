import React from 'react';
import Delete from '../../assets/img/delete.png';
import Edit from '../../assets/img/edit.png';
import { useUpdateTodoMutation } from '../../redux/todosAPI';

const TodoItem = ({ task, id, status, changeTodo, deleteTodoItem }) => {
  const [updateTodo] = useUpdateTodoMutation();

  const onChangeCheckbox = ({ target: { checked } }) => {
    updateTodo({ task, id, status: checked });
  };

  return (
    <div className="text-[1.2rem] font-medium flex justify-between">
      <div className="">
        <input
          type="checkbox"
          id={task}
          className="cursor-pointer checkbox"
          checked={status}
          onChange={onChangeCheckbox}
        />
        <label
          htmlFor={task}
          className={status ? 'cursor-pointer line-through opacity-70' : 'cursor-pointer'}
        >
          {task}
        </label>
      </div>
      <div className="flex gap-3">
        <img
          src={Edit}
          alt="edit"
          className="cursor-pointer w-4 h-4"
          onClick={() => changeTodo({ task, id, status })}
        />
        <img
          src={Delete}
          alt="delete"
          className="cursor-pointer w-4 h-4"
          onClick={() => deleteTodoItem(id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
