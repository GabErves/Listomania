"use client";
import EditList from "../../../../../../pages/EditList";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//The page that appears at user/[user_id]/list/[list_id]:

const Page = (props) => {
  //Gets the user id to put into url link before anything else
  // const { list_id } = props.params.list_id;

  return (
    <>
      {/* <p>Editing Page Stub</p> */}
      <EditList list_id={props.params.list_id}></EditList>
    </>
  );
};

export default Page;
