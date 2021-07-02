import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";
import StyledWrapper from "./Wrapper";
import StyledButton from "./Button";

type Contents = {
  title: string;
  message: string;
  onConfirm: () => void;
};

const Backdrop: React.FC<{ className: string; onConfirm: () => void }> = (
  props
) => {
  return <div className={props.className} onClick={props.onConfirm} />;
};

const StyledBackdrop = styled(Backdrop)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;

const ModalOverlay: React.FC<Contents & { className: string }> = (props) => {
  return (
    <StyledWrapper className={props.className}>
      <header>
        <h2>{props.title}</h2>
      </header>
      <div className="content">
        <p>{props.message}</p>
      </div>
      <footer>
        <StyledButton className="modal-button" onClick={props.onConfirm}>
          Okay
        </StyledButton>
      </footer>
    </StyledWrapper>
  );
};

const StyledModal = styled(ModalOverlay)`
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  overflow: hidden;

  & header {
    background: #4f005f;
    padding: 1rem;
  }

  & header h2 {
    margin: 0;
    color: white;
  }

  & content {
    padding: 1rem;
  }

  & footer {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  &@media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
`;

const maybeBrAnchor: HTMLElement | null =
  document.getElementById("backdrop-root");
var brAnchor: HTMLElement;
if (maybeBrAnchor) {
  brAnchor = maybeBrAnchor;
}

const maybeMrAnchor: HTMLElement | null = document.getElementById("modal-root");
var mrAnchor: HTMLElement;
if (maybeMrAnchor) {
  mrAnchor = maybeMrAnchor;
}

const ErrorModal: React.FC<Contents> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <StyledBackdrop
          className="modal-backdrop"
          onConfirm={props.onConfirm}
        />,
        brAnchor
      )}
      {ReactDOM.createPortal(
        <StyledModal
          className="modal-overlay"
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        mrAnchor
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
