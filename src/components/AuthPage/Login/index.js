import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function LoginPage() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="bg-white rounded-lg m-3">
        <TextField
            id="username"
            label="Username"
        />
      </div>
      <div className="bg-white rounded-lg m-3">
        <TextField
          id="password"
          label="Password"
          type="password"
          // autoComplete="current-password"
        />
      </div>
    </Box>
  );
}

export default LoginPage;
