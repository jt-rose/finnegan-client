import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";

function Login() {
  const navigate = useNavigate();
  const login = () => {
    User.login("user", "password");
  };
  // const loginMutation = useMutation(
  //   (config: { username: string; password: string }) =>
  //     axios.post(LOGIN_ROUTE, config),
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //       const token = data.headers.authorization;
  //       console.log(token);
  //       sessionStorage.setItem("token", token);
  //       navigate("/");
  //     },
  //   }
  // );

  // const handleLogin = () => {
  //   loginMutation.mutate({ username: "user", password: "password" });
  // };

  return <p onClick={login}>login</p>;
}

export default Login;
