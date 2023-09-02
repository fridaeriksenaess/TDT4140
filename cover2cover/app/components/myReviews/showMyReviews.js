"use client";
import React from "react";
import { useState, useEffect } from "react";
import pb from "@/app/pocketbase";
import MyReview from "@/app/components/myReviews/myReview";

export default function ShowMyReviews(props) {
  const [reviewsData, setReviewsData] = useState([]);
  const [bookData, setBookData] = useState([]);

  const fetchMyReviews = async () => {
    // fetch a paginated records list
    console.log("here");
    const resultList = await pb
      .collection("reviews")
      .getList(1, 50, {
        filter: `user.id = '${props.user}'`,
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    setReviewsData(resultList.items);
  };

  const fetchBooks = async () => {
    const resultList = await pb.collection("books").getList(1, 50, {
      filter: "",
    });
    setBookData(resultList.items);
  };

  useEffect(() => {
    fetchMyReviews();
    fetchBooks();
  }, []);

  return (
    <>
      <div className="w-4/5">
        {reviewsData.map((reviews) => {
          let title;

          if (bookData.length > 0) {
            title = bookData.find((books) => books.id == reviews.book);
          }
          return (
            <div
              className="mt-3 mb-3 flex h-fit w-full flex-col rounded-lg border bg-white py-2 px-3 shadow"
              key={reviews.id}
            >
              <div className="flex flex-col items-stretch gap-4">
                <MyReview
                  reviewId={reviews.id}
                  rating={reviews.rating}
                  book={title}
                  review={reviews.review}
                  date={reviews.created}
                  user={props.user}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
