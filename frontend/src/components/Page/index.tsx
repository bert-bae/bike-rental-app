import React from "react";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import PageWrapper from "./PageWrapper";
import NavigationBar from "./NavigationBar";
import "react-notifications-component/dist/theme.css";

type PageProps = React.FC<{ children: any; pageTitle?: string }>;

const Page: PageProps = ({ pageTitle, children }) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <NavigationBar
        onLogin={(e: React.MouseEvent<HTMLButtonElement>) => navigate("/login")}
        onLogout={(e: React.MouseEvent<HTMLButtonElement>) =>
          navigate("/login")
        }
      />
      <PageWrapper>
        {pageTitle && (
          <Typography variant="h5" marginBottom={"20px"}>
            {pageTitle}
          </Typography>
        )}
        {children}
      </PageWrapper>
    </React.Fragment>
  );
};

export default Page;
