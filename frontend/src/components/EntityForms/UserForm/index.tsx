import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { TUserModel, UserRoleEnum } from "../../../types/entities.type";
import { FormHelperText } from "@mui/material";

type UserFormProps = {
  user?: TUserModel | void;
  isAdmin: boolean;
  onSubmit: (user: TUserModel) => void;
  onCancel?: () => void;
};

const UserForm: React.FC<UserFormProps> = ({
  user,
  isAdmin,
  onSubmit,
  onCancel,
}) => {
  const [formErrors, setFormErrors] = React.useState<Record<string, any>>({});

  const clearFormErrors = () => setFormErrors({});
  const validate = (input: { password: any; confirmPassword: any }) => {
    const { password, confirmPassword } = input;

    let validated = true;
    if (password && confirmPassword && password !== confirmPassword) {
      setFormErrors((prev) => ({
        ...prev,
        password: "Passwords do not match",
        confirmPassword: "Passwords do not match",
      }));
      validated = false;
    }

    return validated;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = {
      id: formData.get("id") || undefined,
      name: formData.get("name"),
      username: formData.get("username"),
      role: formData.get("role"),
      password: formData.get("password"),
    };

    const validation = validate({
      password: data.password,
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!validation) {
      return;
    }

    clearFormErrors();
    onSubmit(data as TUserModel);
  };

  return (
    <Box
      style={{ padding: "20px", width: "500px" }}
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 1 }}
    >
      <Typography variant="h6">{user?.id ? "Edit" : "Create"} User</Typography>
      <TextField
        margin="normal"
        name="id"
        type="text"
        style={{ display: "none" }}
        defaultValue={user?.id || ""}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        disabled={!!user?.username}
        name="username"
        label="Username"
        type="text"
        defaultValue={user?.username || ""}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Name"
        name="name"
        autoFocus
        defaultValue={user?.name || ""}
      />
      {isAdmin && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select defaultValue={user?.role || ""} name="role" label="Role">
            <MenuItem value={UserRoleEnum.Admin}>{UserRoleEnum.Admin}</MenuItem>
            <MenuItem value={UserRoleEnum.Member}>
              {UserRoleEnum.Member}
            </MenuItem>
          </Select>
        </FormControl>
      )}
      <FormControl fullWidth>
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Temporary Password"
          type="password"
          error={!!formErrors.password}
          required={!user}
        />
        {formErrors.password && (
          <FormHelperText style={{ color: "red" }}>
            {formErrors.password}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <TextField
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm Temporary Password"
          type="password"
          error={!!formErrors.confirmPassword}
          required={!user}
        />
        {formErrors.confirmPassword && (
          <FormHelperText style={{ color: "red" }}>
            {formErrors.confirmPassword}
          </FormHelperText>
        )}
      </FormControl>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          type="button"
          variant="text"
          sx={{ mt: 3, mb: 2 }}
          style={{ marginRight: "8px" }}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
          {user?.id ? "Edit" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
