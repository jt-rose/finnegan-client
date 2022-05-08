import axios from "axios";
import { useQuery } from "react-query";
import { BASE_ROUTE } from "../queries/baseRoute";
import { get, post, put, remove } from "../queries/fetchers";

export class User {
  username: string;
  // unhashed password
  password: string;
  role: string;
  goal?: number;
  goalDate?: Date;

  private static URL = BASE_ROUTE + "/user";

  constructor(
    username: string,
    password: string,
    goal?: { amount: number; goalDate?: Date }
  ) {
    this.username = username;
    this.password = password;
    this.role = "USER";
    this.goal = goal?.amount;
    this.goalDate = goal?.goalDate;
  }

  // auth methods
  public static login(username: string, password: string) {
    return axios
      .post(BASE_ROUTE + "/login", { username, password })
      .then((res) => {
        const token = res.headers.authorization;
        sessionStorage.setItem("token", token);
        // connect to fetch user with error handling
      });
  }

  public static logout() {
    sessionStorage.removeItem("token");
    // clear cache
  }

  // CRUD methods
  save() {
    return post(User.URL, {
      username: this.username,
      password: this.password,
      role: this.role,
      goal: this.goal,
      goalDate: this.goalDate,
    });
  }

  public static get fetch() {
    return () => useQuery<IUser, Error>("user", () => get(User.URL));
  }

  public static edit(user: IUser) {
    return put(User.URL + "/" + user.id, user);
  }

  public static remove(user: IUser) {
    return remove(User.URL + "/" + user.id);
  }
}

export interface IUser extends Omit<User, "password" | "save"> {
  id: number;
}
