import React from "react";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";

type PageWrapperProps = React.FC<{ children: any }>;

const theme = createTheme();

const MainContainer = styled(Container)({
  height: "fit-content",
  width: "100%",
  paddingTop: "50px",
  paddingBottom: "50px",
  boxSizing: "border-box",
});

const PageWrapper: PageWrapperProps = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <CssBaseline />
        {props.children}{" "}
      </MainContainer>
    </ThemeProvider>
  );
};

export default PageWrapper;
