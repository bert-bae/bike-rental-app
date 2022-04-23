import React from "react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type PageWrapperProps = React.FC<{ children: any }>;

const theme = createTheme();
const PageWrapper: PageWrapperProps = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        {props.children}{" "}
      </Container>
    </ThemeProvider>
  );
};

export default PageWrapper;
