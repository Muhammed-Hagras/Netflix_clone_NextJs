import Input from "@/components/Input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
export default function auth() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [variant, setVariant] = useState("login");
  const router = useRouter();
  const toggleVariant = useCallback(() => {
    setVariant((currVariant) =>
      currVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full bg-[url('/assets/imgs/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className=" w-full h-full lg:bg-opacity-50">
        <div className="px-12 py-5">
          <img src="/assets/imgs/logo.png" alt="logo" className="h-12" />
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login" ? "Sign in" : "Register"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    onChange={(e: any) => {
                      setName(e.target.value);
                    }}
                    id="name"
                    type="text"
                    label="Username"
                    value={name}
                  />
                )}
                <Input
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  label="Email"
                  value={email}
                />
                <Input
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                />
              </div>
              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md w-full
              mt-5 transition hover:bg-red-700
              "
              >
                {variant === "login" ? "Login" : "Register"}
              </button>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "First time using Netflix ? "
                  : "Already have an account"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 
                  hover:underline cursor-pointer
                  "
                >
                  {variant === "login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
