import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UserForm from "../../components/EntityForms/UserForm";
import Page from "../../components/Page";
import Copyright from "../../components/Copyright";
import useRegistrationPage from "./useRegistrationPage";

const RegistrationPage = () => {
  const { onSubmit, onCancel } = useRegistrationPage();

  return (
    <Page>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <UserForm isAdmin={false} onSubmit={onSubmit} onCancel={onCancel} />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Page>
  );
};

export default RegistrationPage;
