"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import pb from "@/app/pocketbase";

export default function CreateReview({ book }) {
  //book and user info

  //const book = "ou3m20afhaile1m";
  const user = pb.authStore.model.id;

  const [booksData, setBooksData] = useState([]);
  const fetchAllBooks = async () => {
    console.log(book);
    // fetch a paginated records list
    const resultList = await pb.collection("books").getList(1, 50, {
      filter: "",
    });
    setBooksData(resultList.items);
  };

  const [reviewsData, setReviewsData] = useState([]);
  const fetchAllReviews = async () => {
    // fetch a paginated records list
    const resultList = await pb
      .collection("reviews")
      .getList(1, 50, {
        filter: "",
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    setReviewsData(resultList.items);
  };

  useEffect(() => {
    fetchAllBooks();
    fetchAllReviews();
  }, []);

  //Saving input data upon change
  const [inputData, setInputState] = useState({
    review: "",
    rating: "",
  });

  const existsReview = () => {
    let foundExistingReview = false;
    reviewsData.forEach((r) => {
      if (r.user == user && r.book == book) {
        foundExistingReview = true;
      }
    });

    return foundExistingReview;
  };

  //saves review in database
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (existsReview()) {
      alert(
        "You have to delete your existing review for this book, in order to create a new one!"
      );
    } else if (
      !(
        inputData.rating.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) &&
        parseFloat(inputData.rating) < 10
      )
    ) {
      alert("Invalid input!");
    } else {
      await pb.collection("reviews").create({
        rating: inputData.rating,
        review: inputData.review,
        user: user,
        book: book,
      });
      await fetchAllReviews();
      alert("Thank you for your opinion!");
    }
  };

  //Handles changes in input fields
  function handleChange(evt) {
    const value = evt.target.value;
    setInputState({
      ...inputData,
      [evt.target.name]: value,
    });
  }

  return (
    <div className="h-120 block w-1/2 rounded-lg border-4 border-loginBorder object-contain py-2 px-3">
      {booksData.map((b) => {
        if (b.id == book) {
          return (
            <div className="flex items-center justify-start pb-3">
              <img className="w-30 h-60 object-contain" src={b.image}></img>

              <div className="w-full">
                <p className="text-black-700 ml-2 space-y-1 break-words pl-2 font-sans font-bold">
                  {b.title}
                </p>
                <div className="px-4 py-2">
                  <div className="flex items-center">
                    <svg
                      aria-hidden="true"
                      class="pb- text-yellow-400 h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <label
                      for="first_name"
                      className=" mb-2 mt-2 block pl-2 text-sm font-medium "
                    >
                      Rate (1-10):
                    </label>
                  </div>
                  <input
                    id="rating"
                    className="bg-gray-50 border-gray-300  block w-full rounded-lg border p-2.5 text-sm focus:border-inputFieldBlue focus:ring-inputFieldBlue dark:focus:border-inputFieldBlue dark:focus:ring-inputFieldBlue"
                    placeholder="7.1"
                    type="text"
                    name="rating"
                    value={inputData.rating}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="px-4 pb-4 ">
                  <div>
                    <label
                      for="last_name"
                      className=" mb-2 block text-sm font-medium "
                    >
                      Review:
                    </label>
                    <input
                      type="text"
                      id="review"
                      className="bg-gray-50 border-gray-300  dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm focus:border-inputFieldBlue focus:ring-inputFieldBlue dark:focus:ring-inputFieldBlue"
                      placeholder="An amazing book...."
                      name="review"
                      value={inputData.review}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="pr-4">
                  <a
                    id="submitButton"
                    onClick={handleSubmit}
                    href={`/books/${book}`}
                    className="focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-mediumfocus:outline-none float-right rounded-lg bg-btnBlue px-5 py-3 text-center text-sm hover:bg-btnHoverBlue focus:ring-4"
                  >
                    Submit
                  </a>
                  <Link
                    href={`/books/${book}`}
                    className="focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-mediumfocus:outline-none float-right mx-3 rounded-lg bg-btnBlue px-5 py-3 text-center text-sm hover:bg-btnHoverBlue focus:ring-4"
                  >
                    Go back
                  </Link>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
