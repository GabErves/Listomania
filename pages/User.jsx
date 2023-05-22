"use client"
// import { useClient } from "use-supabase";
import { getCurrentUser } from "../utils/data";
import LoggedInHeader from "../components/LoggedInHeader";
import React, { useState, useEffect } from "react";
import CreateList from "./CreateList";
import { useRouter } from "next/router";

const User = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [listItems, setListItems] = useState(["", ""]);
  const router = useRouter();

  const client = useClient(); // Initialize the Supabase client

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await getCurrentUser();
      if (data) {
        setCurrentUser(data);
      } else {
        console.log("Error fetching current user:", error);
      }
    };

    fetchUserData();

    const queryListItems = router.query.listItems;
    if (queryListItems) {
      const decodedListItems = JSON.parse(decodeURIComponent(queryListItems));
      setListItems(decodedListItems);
    }
  }, []);

  return (
    <>
      <use client> {/* Mark LoggedInHeader as a Client Component */}
        <LoggedInHeader />
      </use>
      <h3 className="text-center text-2xl font-bold">Your Lists</h3>
      {currentUser && currentUser.listItems && (
        <ul>
          {currentUser.listItems.map((list) => (
            <li key={list.id}>{list.list_title}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default User;
