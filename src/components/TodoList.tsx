import React, { useState, useEffect } from "react";
import { Observable } from "rxjs";
import { filter, map, groupBy } from "rxjs/operators";
import styled from "styled-components";
import Todo from "./Todo";
import InputTodo from "./InputTodo";

const StyledTodoList = styled.ul`
  list-style: none;
  margin: 0.5rem auto;
  width: 50rem;
  max-width: 95%;
  border-radius: 10px;
`;

const TodoList = () => {
  type TodoType = {
    userId: number | undefined;
    id: number;
    title: string;
    completed: boolean;
  };
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    getData();
  }, []);

  var observable = new Observable<TodoType[] | string>((observer) => {
    try {
      observer.next("Hi");
      // subscriber.next(todos);
      observer.complete();
    } catch (err) {
      observer.error(err);
    }
  });

  console.log(" from before subscriber");
  observable.subscribe((x) => {
    console.log(x + " from subscriber");
  });
  console.log(" from after subscriber");

  /* Creare un array per ogni utente (raggruppare utenti per userId)*/
  observable
    // .pipe(groupBy((todo) => todo.userId))
    .subscribe((todo) => console.log(todo));

  const addNewTodo = (newTodo: TodoType) => {
    //e.preventDefault();
    console.log(newTodo);

    setTodos((prevState) => {
      return [newTodo, ...prevState];
    });
  };

  return (
    <React.Fragment>
      <h1>Lista Todo</h1>
      <StyledTodoList>
        <InputTodo addTodo={addNewTodo} />
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo id={todo.id} title={todo.title} completed={todo.completed} />
          </li>
        ))}
      </StyledTodoList>
    </React.Fragment>
  );
};

export default TodoList;
