"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookie from "universal-cookie";
import * as UserModel from "@/models/user";
import * as UserMapper from "@/mappers/user";
import { api } from "@/libs/api";
import { useRouter } from "next/navigation";

const Context = createContext<{
  user: UserModel.Model | null;
  signIn: (user: UserModel.Model) => void;
  signOut: () => void;
}>(null!);

export function Provider(props: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserModel.Model | null>(null);
  const router = useRouter();

  async function loadUser() {
    const cookie = new Cookie();
    const token = cookie.get("@my-app/token");
    if (token) {
      api.setHeader("Authorization", `Bearer ${token}`);
      const response = await api.get("me");
      if (response.ok) {
        const user = UserMapper.fromObject(response.data);
        setUser(user);
      } else {
        cookie.remove("@my-app/token");
      }
    }
    setIsLoading(false);
  }

  function signIn(user: UserModel.Model) {
    api.setHeader("Authorization", `Bearer ${user.token}`);
    const cookie = new Cookie();
    cookie.set("@my-app/token", user.token);
    setUser(user);
    router.push("/");
  }

  function signOut() {
    const cookie = new Cookie();
    cookie.remove("@my-app/token");
    router.push("/sign-in");
  }

  useEffect(function () {
    loadUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Context.Provider value={{ user, signIn, signOut }}>
      {props.children}
    </Context.Provider>
  );
}

export function useSession() {
  return useContext(Context);
}
