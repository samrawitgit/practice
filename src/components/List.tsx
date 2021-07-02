import React from "react";

import { fromEvent, of } from "rxjs";
import { map, scan, take } from "rxjs/operators";
import Todo from "./Todo";
import TodoType from "../models/TodoType";

const List: React.FC<{ todos: TodoType[] }> = (props) => {
  fromEvent(document, "click")
    .pipe(scan((count) => count + 1, 0))
    .subscribe((count) => console.log(`Clicked ${count} times`));

  const clicks = fromEvent<MouseEvent>(document, "click");
  const positions = clicks.pipe(map((ev) => ev.clientX));
  positions.subscribe((x) => console.log(x));

  let lista: TodoType[] = [];
  of(props.todos)
    .pipe(
      //take(10),
      map((x, i) => {
        for (i = 0; i < 10; i++) {
          lista[i] = x;
        }
      })
    )
    .subscribe((p) => console.log(p));
  console.log(lista);

  /* Creare un array per ogni utente (raggruppare utenti per userId) --> groupBy */

  return (
    <div>
      {lista.map((todo) => (
        <li key={todo.id}>
          <Todo todo={todo} />
        </li>
      ))}
    </div>
  );
};

export default List;
