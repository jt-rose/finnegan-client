import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { useState } from "react";
import { Box, Button, TextField, Container, Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    // "user", "password"
    User.login(username, password).then(() => navigate("/"));
    // ! add error handling
  };

  return (
    <Container
      maxWidth="sm"
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="username-input"
        label="username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        id="password-input"
        label="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
      <Button variant="outlined" onClick={handleLogin}>
        Sign In
      </Button>
      <Typography>
        <Button onClick={() => navigate("/register")}>
          Not a member? Sign up here
        </Button>
      </Typography>
    </Container>
  );
}

export default Login;
