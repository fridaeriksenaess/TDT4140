"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import pb from "@/app/pocketbase";
import { useAuth } from "@/app/context/AuthContext";

export default function Registration(props) {
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
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  //saves user in database
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await pb.collection("users").create({
        username: data.username,
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
      await pb.collection("users").authWithPassword(data.email, data.password);
      setLoggedIn(true);
      setLoading(false);
      router.push("");
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="z-10 flex h-screen w-screen justify-center bg-loginBorder bg-opacity-30">
        <div className="relative my-10 flex h-fit w-1/2 flex-col items-center justify-start space-y-4 rounded-2xl border-2 border-loginBorder bg-white p-10">
          <h1 className="text-2xl">Signup</h1>

          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={inputWrapperStyle}>
              <label htmlFor="username" className={labelStyle("username")}>
                Username
              </label>
              <input
                type="text"
                {...register("username", { required: true })}
                className={inputStyle}
              />
            </div>
            <div className={inputWrapperStyle}>
              <label htmlFor="name" className={labelStyle("name")}>
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className={inputStyle}
              />
            </div>
            <div className={inputWrapperStyle}>
              <label htmlFor="password" className={labelStyle("email")}>
                Email
              </label>
              <input
                type="text"
                className={inputStyle}
                {...register("email", { required: true })}
              />
            </div>
            <div className={inputWrapperStyle}>
              <label htmlFor="password" className={labelStyle("password")}>
                Password
              </label>
              <input
                type="password"
                className={inputStyle}
                {...register("password", { required: true })}
              />
            </div>
            <div className={inputWrapperStyle}>
              <label
                htmlFor="password"
                className={labelStyle("passwordConfirm")}
              >
                Confirm password
              </label>
              <input
                type="password"
                className={inputStyle}
                {...register("passwordConfirm", { required: true })}
              />
            </div>

            <div className="flex flex-row ">
              <button
                type="submit"
                disabled={isLoading}
                className="mx-2 h-12  w-[200px] rounded-lg border bg-btnBlue hover:bg-btnHoverBlue"
              >
                {isLoading ? "Loading..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
