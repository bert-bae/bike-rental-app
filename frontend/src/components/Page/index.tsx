import React from "react";
import { useNavigate } from "react-router";
import PageWrapper from "./PageWrapper";
import NavigationBar from "./NavigationBar";
import DrawerMenu from "./DrawerMenu";
import { Typography } from "@mui/material";

type PageProps = React.FC<{ children: any; pageTitle?: string }>;

const Page: PageProps = ({ pageTitle, children }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(true);
  const toggleDrawer = (event: React.MouseEvent) => {
    event.preventDefault();
    setVisible((prev) => !prev);
  };

  return (
    <React.Fragment>
      <NavigationBar
        loggedIn={false}
        onLogin={(e: React.MouseEvent<HTMLButtonElement>) => navigate("/login")}
        onLogout={(e: React.MouseEvent<HTMLButtonElement>) =>
          navigate("/login")
        }
        onMenuClick={toggleDrawer}
      />
      {/* <DrawerMenu visible={visible} onToggle={toggleDrawer} /> */}
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
