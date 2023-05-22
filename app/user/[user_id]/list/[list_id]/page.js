"use client";
import ViewList from "../../../../../pages/ViewList";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//The page that appears at user/[user_id]/list/[list_id]:

const Page = ({ params }) => {
  const router = useRouter();
  const { user_id } = params;
  const { list_id } = params;

  //Gets the user id to put into url link before anything else

  return (
    <>
      <ViewList list_id={list_id} user_id={user_id}></ViewList>
    </>
  );
};

export default Page;
