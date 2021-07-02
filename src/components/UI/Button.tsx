import React from "react";

import styled from "styled-components";

const Button: React.FC<{
  className: string;
  onClick: () => void;
  type?: "submit" | "reset";
}> = (props) => {
  return (
    <button
      className={props.className}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

const StyledButton = styled(Button)`
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

  &:hover,
  &:active {
    background: #741188;
    border-color: #741188;
  }

  &:focus {
    outline: none;
  }
`;

export default StyledButton;
