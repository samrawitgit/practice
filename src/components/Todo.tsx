// cliccable event that changes tick into X and viceversa
import React, { useState } from "react";
import styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

const TodoItem = styled.div`
  margin: 1rem 0;
  background: #00aaa0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  padding: 1.5rem;
  background: #8ed2c98f;
`;

const Button: React.FC<{
  status: boolean;
  onClick: () => void;
  className: string;
}> = (data) => {
  if (data.status) {
    return (
      <button onClick={data.onClick} className={data.className}>
        <DoneIcon />
      </button>
    );
  } else {
    return (
      <button onClick={data.onClick} className={data.className}>
        <CloseIcon />
      </button>
    );
  }
};

const StyledButton = styled(Button)`
  /* Adapt the colors based on primary prop */
  cursor: pointer;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-width: 5px;
  border-style: solid;
  border-radius: 3px;
  color: #0d2065;
  background: ${(props) => (props.status ? "#1cb449" : "#efb1a2f2")};
  border-color: ${(props) => (props.status ? "green" : "#ff7a5a")};

  &:hover {
    box-shadow: 4px 5px 8px 4px rgb(0 0 0 / 26%);
  }
`;

type TodoType = { id: number; title: string; completed: boolean };
const Todo: React.FC<TodoType> = (props) => {
  const [status, setStatus] = useState<boolean>(props.completed);
  // const TodoItem = styled.div`
  //   margin: 1rem 0;
  //   background: #00aaa0;
  //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  //   color: white;
  //   padding: 1rem 2rem;
  //   display: flex;
  //   justify-content: space-between;
  // `;

  // const Wrapper = styled.div`
  //   padding: 1.5rem;
  //   background: #8ed2c98f;
  // `;

  const clickHandler = (done: boolean) => {
    if (done) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  // const Button: React.FC<{
  //   status: boolean;
  //   onClick: () => void;
  //   className: string;
  // }> = (data) => {
  //   if (data.status) {
  //     return (
  //       <button onClick={data.onClick} className={data.className}>
  //         <DoneIcon />
  //       </button>
  //     );
  //   } else {
  //     return (
  //       <button onClick={data.onClick} className={data.className}>
  //         <CloseIcon />
  //       </button>
  //     );
  //   }
  // };

  // const StyledButton = styled(Button)`
  //   /* Adapt the colors based on primary prop */
  //   cursor: pointer;
  //   font-size: 1em;
  //   margin: 1em;
  //   padding: 0.25em 1em;
  //   border-width: 5px;
  //   border-style: solid;
  //   border-radius: 3px;
  //   color: #0d2065;
  //   background: ${(props) => (props.status ? "#1cb449" : "#efb1a2f2")};
  //   border-color: ${(props) => (props.status ? "green" : "#ff7a5a")};

  //   &:hover {
  //     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  //   }
  // `;

  return (
    <Wrapper>
      <TodoItem>
        <h3>Todo: {props.title}</h3>
        <StyledButton
          onClick={() => clickHandler(status)}
          status={status}
          className="icon"
        />
      </TodoItem>
    </Wrapper>
  );
};

export default Todo;
