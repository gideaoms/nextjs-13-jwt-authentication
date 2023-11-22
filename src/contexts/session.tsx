"use client";

import React, { ReactNode, createContext, useState } from "react";
import Cookie from "universal-cookie";
import * as UserModel from "@/models/user";
import * as UserMapper from "@/mappers/user";
import { api, setToken } from "@/libs/api";
import { useRouter } from "next/navigation";

const cookie = new Cookie();

const Context = createContext<{
  user: UserModel.Model | null;
  onInit(props: { onSuccess(): void; onError(): void }): void;
  signIn(user: UserModel.Model): void;
  signOut(): void;
}>(null!);

export function Provider(props: { children: ReactNode }) {
  const [user, setUser] = useState<UserModel.Model | null>(null);
  const router = useRouter();

  async function onInit(props: { onSuccess(): void; onError(): void }) {
    const token = cookie.get("@my-app/token");
    if (!token) {
      props.onError();
      return;
    }
    setToken(token);
    const result = await api.get("users/me");
    const isStatusOk = result.status >= 200 && result.status <= 299;
    if (!isStatusOk) {
      cookie.remove("@my-app/token");
      props.onError();
      return;
    }
    const user = UserMapper.fromObject(result.data);
    setUser(user);
    props.onSuccess();
  }

  function signIn(user: UserModel.Model) {
    setToken(user.token);
    cookie.set("@my-app/token", user.token);
    setUser(user);
    router.push("/");
  }

  function signOut() {
    cookie.remove("@my-app/token");
    setUser(null);
    router.push("/sign-in");
  }

  return (
    <Context.Provider value={{ user, onInit, signIn, signOut }}>
      {props.children}
    </Context.Provider>
  );
}

export function useContext() {
  return React.useContext(Context);
}
