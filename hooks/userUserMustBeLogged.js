"use client";
import { useEffect } from "react";
import useUser from "./useUser";
import { useRouter } from "next/navigation";

const useUserMustBeLogged = (what = "in", url = "/") => {
  const { user, fullyLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!fullyLoaded) {
      return;
    }
    if ((what === "in" && !user) || (what === "out" && !!user)) {
      router.push(url);
    }
  }, [user, what, router, url]);
};

export default useUserMustBeLogged;
