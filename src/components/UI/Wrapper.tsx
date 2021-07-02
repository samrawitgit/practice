import React from "react";

import styled from "styled-components";

const Wrapper: React.FC<{ className: string }> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

const StyledWrapper = styled(Wrapper)`
  padding: 1.5rem;
  background: #8ed2c98f;
`;

export default StyledWrapper;
