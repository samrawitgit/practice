import React, { useState, useRef, useEffect, useMemo } from "react";

import styled from "styled-components";
import TodoType from "../models/TodoType";
import StyledWrapper from "./UI/Wrapper";
import ErrorModal from "./UI/ErrorModal";

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

const InputTodo: React.FC<{ addTodo: (data: TodoType) => void }> = (props) => {
  const [newTodo, setNewTodo] = useState<string | undefined>(undefined);
  const [error, setError] = useState<{
    title: string;
    message: string;
  } | null>();

  const newTodoChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  var myTodoValue = useRef<string | null>(null);

  const formDataMemo = useMemo(() => {
    console.log("call uM");
    let formData = new FormData();
    if (myTodoValue.current !== null) {
      formData.append("title", myTodoValue.current);
      return formData;
    }
  }, [myTodoValue]);

  useEffect(() => {
    console.log("call uE");
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: formDataMemo,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [formDataMemo]);

  const submitHandler = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    if (newTodo !== undefined && newTodo.trim() !== "") {
      const todoData = new TodoType(newTodo);
      props.addTodo(todoData);

      setNewTodo("");
    } else {
      // Add error message

      setError({
        title: "Invalid input",
        message: "Please enter a valid Todo (non-empty values).",
      });
      return;
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <StyledWrapper className="form-wrapper">
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <StyledForm onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add new Todo..."
          value={newTodo}
          onChange={newTodoChangeHandler}
          name="title"
          id="myTodo"
        />
        <button type="submit">Add</button>
      </StyledForm>
    </StyledWrapper>
  );
};

export default InputTodo;
