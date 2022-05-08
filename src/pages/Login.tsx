import { useNavigate } from "react-router-dom";
import { User } from "../models/User";

function Login() {
  const navigate = useNavigate();
  const login = () => {
    User.login("user", "password").then(() => navigate("/"));
  };

  return <p onClick={login}>login</p>;
}

export default Login;
