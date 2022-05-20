import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { useState } from "react";
import { Button, TextField, Container } from "@mui/material";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    await new User(username, password).save();
    navigate("/");
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
        Sign Up
      </Button>
    </Container>
  );
}

export default Register;
