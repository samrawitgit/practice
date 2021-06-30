import React, { useState } from "react";

import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  margin: 2rem auto;
  width: 50rem;
  max-width: 95%;
  border-radius: 12px;
  background-color: #5c66b8;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);

  & label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  & input {
    font: inherit;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    width: 20rem;
    max-width: 100%;
  }

  & button {
    font: inherit;
    font-weight: bold;
    cursor: pointer;
    padding: 1rem 2rem;
    border: 2px solid #00aaa0;
    background-color: #00aaa0;
    color: white;
    border-radius: 12px;
    margin-right: 1rem;
    text-align: right;
  }

  & button:hover {
    border-color: #2bd1c7;
    background-color: #2bd1c7;
  }
`;

type TodoType = {
  userId: number | undefined;
  id: number;
  title: string;
  completed: boolean;
};
const InputTodo: React.FC<{ addTodo: (data: TodoType) => void }> = (props) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const newTodoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    if (newTodo.trim() !== "") {
      const todoData = {
        userId: 1,
        id: 5,
        title: newTodo,
        completed: false,
      };

      props.addTodo(todoData);
    } else {
      // Add error message
    }
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      {/* <label>New Todo</label> */}
      <input
        type="text"
        placeholder="Add new Todo..."
        value={newTodo}
        onChange={newTodoChangeHandler}
      />
      <button type="submit">Add</button>
    </StyledForm>
  );
};

export default InputTodo;
