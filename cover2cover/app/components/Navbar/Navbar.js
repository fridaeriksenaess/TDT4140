"use client";
import SearchFilter from "../Searchbar/SearchFilter";
import pb from "@/app/pocketbase";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/LOGOC2C.png";
import DarkMode from "../DarkMode/DarkMode";
import { useAuth } from "@/app/context/AuthContext";

export default (props) => {
  const [dummy, setDummy] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const currentUserId = pb.authStore.isValid ? pb.authStore.model.id : null;
  const [loggedIn, setLoggedIn] = useAuth();

  useEffect(() => {
    const handleStorageChange = (event) => {
      setDarkMode(!darkMode);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [localStorage.getItem("darkMode")]);
  
  
  useEffect(() => {
    setLoggedIn(pb.authStore.isValid);
  }, [pb.authStore.isValid]);


  const logInOrProfile = () => {
    return {
      title: loggedIn ? "Profile" : "Log In",
      url: loggedIn ? `/profile/${currentUserId}` : "/login",
      onClick: null,
    };
  };

  const handleLogout = async () => {
    pb.authStore.clear();
    setLoggedIn(false);
  };

  const logoutLink = () => {
    return loggedIn
      ? { title: "Log Out", url: "#", onClick: handleLogout }
      : { title: "", url: "#", onClick: null };
  };

  const NavbarData = [
    { title: "Books", url: "/books", onClick: null },
    logInOrProfile(),
    logoutLink(),
  ];

  return (
    <header className="flex max-h-[120px] w-screen justify-items-center bg-sand text-black dark:bg-white/[15%] ">
      <div className="bg-inherit relative mx-auto flex w-1080 items-center justify-between text-xl">
        <div className="flex items-center">
          <Link href="../">
            <Image width={300} height={200} alt="logo" src={logo}></Image>
          </Link>
        </div>
        <nav className="flex h-fit items-center">
          <ul className="bg-inherit flex flex-row items-center self-auto whitespace-nowrap text-black dark:text-white">
            {NavbarData.map((item, index) => {
              return (
                <li key={index} className="font-serif w-fit p-3 text-3xl">
                  <Link
                    href={item.url}
                    className="cursor-pointer"
                    onClick={item.onClick}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="relative py-[11px]">
          <SearchFilter />
        </div>
        <DarkMode />
      </div>
    </header>
  );
};
