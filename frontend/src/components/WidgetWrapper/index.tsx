import React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

type WidgetWrapperProps = { children: any };

const StyledBox = styled(Box)({
  borderRadius: "5px",
  boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
  margin: "20px 0",
  backgroundColor: "#fff",
  padding: "20px",
});

const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default WidgetWrapper;
