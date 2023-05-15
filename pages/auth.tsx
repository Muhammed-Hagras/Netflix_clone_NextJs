import Input from "@/components/Input";
import React, { useCallback, useState } from "react";

export default function auth() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currVariant) =>
      currVariant === "login" ? "register" : "login"
    );
  }, []);
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
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                />
                <Input
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  label="Email"
                  value={email}
                />
              </div>
              <button
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
