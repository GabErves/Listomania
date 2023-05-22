import React, { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import { useRouter } from "next/navigation";
import "../app/globals.css";
import "./pages.css";
import LoggedInHeader from "@/components/LoggedInHeader";
import {
  getListItems,
  getCurrentID,
  ifOwnList,
  updateList,
  getCurrentUser,
  addNewList,
  deleteItems,
} from "../utils/data";

const EditList = ({ list_id }) => {
  const [listItems, setListItems] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [localUsername, setLocalUsername] = useState("Username");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const router = useRouter();

  const { user } = useUser();

  const handleAddItem = () => {
    setListItems([...listItems, { content: "", isChecked: false }]);
  };

  const handleRemoveItem = (index) => {
    const updatedListItems = [...listItems];
    updatedListItems.splice(index, 1);
    setListItems(updatedListItems);
  };

  const editedList = async (e) => {
    e.preventDefault();

    const { data: items } = await getListItems(list_id);

    // Length of old list
    const oldLength = items.length;

    const listTitle = e.target.elements["large-input"].value;

    for (let i = 0; i < listItems.length; i++) {
      if (i < oldLength) {
        const listItem = await updateList(
          user.id, // user_id
          listTitle, // list_title
          listItems[i].content, // list item content
          i, // order
          localUsername, // username
          listItems[i].isChecked, // is_checked
          list_id // list_id
        );
      } else {
        const newlistItem = await addNewList(
          user.id, // user_id
          listTitle, // list_title
          listItems[i].content, // list item content
          i, // order
          localUsername, // username
          listItems[i].isChecked, // is_checked
          list_id // list_id
        );
      }
    }

    if (listItems.length < oldLength) {
      for (let i = listItems.length; i < oldLength; i++) {
        const deletedItems = await deleteItems(
          list_id, // list_id
          i // order
        );
      }
    }

    router.push(`/user/${user.id}`, {
      query: { listItems: JSON.stringify(listItems) },
    });

    setSubmissionStatus("success");
    setSubmissionMessage("List submitted successfully!");
  };

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const { data: items } = await getListItems(list_id);
        const list = items.map((item) => ({
          content: item.list_item,
          isChecked: item.is_checked,
        }));
        const title = items[0].list_title;

        setListItems(list);
        setListTitle(title);
      } catch (error) {
        console.log("Error fetching list details:", error);
      }
    };

    fetchListDetails();
  }, [list_id]);

  useEffect(() => {
    const fetchCurrentUsername = async () => {
      const { data, error } = await getCurrentUser();

      if (data) {
        setLocalUsername(data.ListoMeta?.username || "");
      } else {
        console.log("Error fetching current user:", error);
      }
    };

    fetchCurrentUsername();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedListItems = [...listItems];
    updatedListItems[index].isChecked = !updatedListItems[index].isChecked;
    setListItems(updatedListItems);
  };

  const handleMoveItemUp = (index) => {
    if (index === 0) return;

    const updatedListItems = [...listItems];
    const currentItem = updatedListItems[index];
    updatedListItems[index] = updatedListItems[index - 1];
    updatedListItems[index - 1] = currentItem;

    setListItems(updatedListItems);
  };

  const handleMoveItemDown = (index) => {
    if (index === listItems.length - 1) return;

    const updatedListItems = [...listItems];
    const currentItem = updatedListItems[index];
    updatedListItems[index] = updatedListItems[index + 1];
    updatedListItems[index + 1] = currentItem;

    setListItems(updatedListItems);
  };

  return (
    <>
      <div>
        <LoggedInHeader />
        <h3 className="text-center text-5xl font-bold p-10">List Editor</h3>

        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit List
          </h2>

          <form action="#" onSubmit={editedList}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="large-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Edit Title
                </label>
                <input
                  type="text"
                  id="large-input"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type List Title"
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                  required=""
                />
              </div>

              {listItems.map((item, index) => (
                <div key={index} className="sm:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name={`checkbox-${index}`}
                      checked={item.isChecked}
                      onChange={() => handleCheckboxChange(index)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`list-item-${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >{`List Item ${index + 1}`}</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id={`list-item-${index}`}
                      name={`list-item-${index}`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter List Content"
                      value={item.content}
                      onChange={(e) => {
                        const updatedListItems = [...listItems];
                        updatedListItems[index].content = e.target.value;
                        setListItems(updatedListItems);
                      }}
                      required=""
                    />
                    {index >= 1 && (
                      <button
                        type="button"
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-600 hover:text-red-800 focus:text-red-800 focus:outline-none"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {index > 0 && (
                    <div className="mt-2">
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none mr-2"
                        onClick={() => handleMoveItemUp(index)}
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
</svg>

                      </button>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none"
                        onClick={() => handleMoveItemDown(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
</svg>

                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none"
                  onClick={handleAddItem}
                >
                  + Add More
                </button>
              </div>
            </div>

            <div className="padd2">
              <button
                type="submit"
                className="text-white bg-stone-700 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
              >
                Edit List
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditList;
