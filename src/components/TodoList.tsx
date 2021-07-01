import React, { useState, useEffect } from "react";

import styled from "styled-components";
import InputTodo from "./InputTodo";
import List from "./List";
import TodoType from "../models/TodoType";

const StyledTodoList = styled.ul`
  list-style: none;
  margin: 0.5rem auto;
  width: 50rem;
  max-width: 95%;
  border-radius: 10px;
`;

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const url = "https://jsonplaceholder.typicode.com/todos";
  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    getData();
    console.log("Hi from uE");
  }, [url]);

  const addNewTodo = (newTodo: TodoType) => {
    //console.log(newTodo);
    setTodos((prevState) => {
      return [newTodo, ...prevState];
    });
  };

  return (
    <React.Fragment>
      <h1>Lista Todo</h1>
      <StyledTodoList>
        <InputTodo addTodo={addNewTodo} />
        <List todos={todos} />
      </StyledTodoList>
    </React.Fragment>
  );
};

export default TodoList;
