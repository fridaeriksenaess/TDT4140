"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import pb from "@/app/pocketbase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Auth() {
  const [loggedIn, setLoggedIn] = useAuth();

  const inputStyle =
    "border-none px-0 pt-[16px] pb-[10px] text-base outline-none ";
  const inputWrapperStyle =
    "focus-within:border-inputFieldBlue group relative flex w-72 flex-col rounded-lg border p-10 py-0 px-[8px] ";

  const labelStyle = (field) => {
    return `${
      watch(field) != "" && "filled"
        ? "text-gray-500 translate-y-[4px] scale-75"
        : "translate-y-[16px] scale-100"
    }
      group-focus-within:text-gray-500 absolute  origin-top-left text-base transition-all group-focus-within:translate-y-[4px] group-focus-within:scale-75 `;
  };

  const { register, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  async function login(data) {
    setLoading(true);
    try {
      await pb.collection("users").authWithPassword(data.email, data.password);
      setLoggedIn(true);
      setLoading(false);
      router.push("");
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  }

  function newUser() {
    console.log("New user");
  }

  return (
    <>
      <div className="z-10 flex h-screen w-screen justify-center bg-loginBorder bg-opacity-30">
        {/* z-index = 10 to come in front*/}
        <div className="relative my-10 flex max-h-[300px] min-h-[200px] w-1/2 flex-col items-center justify-start space-y-4 rounded-2xl border-2 border-loginBorder bg-white p-10">
          <h1 className="text-2xl">Log In</h1>

          <form
            onSubmit={handleSubmit(login)}
            className="flex flex-col items-center space-y-4"
          >
            <div className={inputWrapperStyle}>
              <label htmlFor="email" className={labelStyle("email")}>
                Email
              </label>
              <input
                type="text"
                {...register("email", { required: true })}
                className={inputStyle}
              />
            </div>
            <div className={inputWrapperStyle}>
              <label htmlFor="password" className={labelStyle("password")}>
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className={inputStyle}
              />
            </div>
            <div className="flex flex-row ">
              <button
                type="submit"
                disabled={isLoading}
                className="mx-2 h-12 w-[100px]  rounded-lg  border bg-btnBlue hover:bg-btnHoverBlue"
              >
                {isLoading ? "Please wait..." : "Login"}
              </button>
              {/*Link to submit onClick={newUser}*/}
              <Link href={"/signup"}>
                <button
                  type="button"
                  onClick={newUser}
                  className="mx-2 h-12  w-[100px] rounded-lg border bg-btnBlue hover:bg-btnHoverBlue"
                >
                  Sign up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
