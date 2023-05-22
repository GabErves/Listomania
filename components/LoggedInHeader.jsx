"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ListIcon from "../images/List-4.png";
import "../app/globals.css";
import "./Header.css";
import { getCurrentUser, logoutUser, getCurrentID } from "../utils/data.js";

import React from "react";

const LoggedInHeader = () => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [localID, setLocalID] = useState("");

  //Gets the user id to put into url link before anything else
  const idFetcher = async () => {
    const hold = await getCurrentID();
    if (hold) {
      setLocalID(hold);
    }
  };

  useEffect(() => {
    idFetcher();
  }, []);
  const handleLogout = async () => {
    const result = await logoutUser();

    if (result.success) {
      router.push("/Login");
    } else {
      console.error("Logout error:", result.message);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data, error } = await getCurrentUser();

      if (data) {
        setFirstName(data.ListoMeta?.first_name || "");
      } else {
        console.log("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-stone-500 mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <a
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                href="/HomePage"
              >
                <Image
                  src={ListIcon}
                  alt={"LinkBarge"}
                  height="120"
                  width="120"
                />
              </a>
              <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div
              className={
                "lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
              id="example-navbar-danger"
            >
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href={`/user/${localID}`}
                  >
                    <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Welcome, {firstName}</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="/CreateList"
                  >
                    <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Create</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href={`/user/${localID}`}
                  >
                    <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">My Lists</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="/Login"
                    onClick={handleLogout}
                  >
                    <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
};

export default LoggedInHeader;
