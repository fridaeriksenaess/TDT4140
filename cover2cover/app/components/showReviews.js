"use client";
import { useState, useEffect } from "react";
import pb from "@/app/pocketbase";
import Review from "@/app/components/review";

export default function ShowReviews({ book }) {
  const [reviewsData, setReviewsData] = useState([]);
  const fetchAllReviews = async () => {
    // fetch a paginated records list
    const resultList = await pb
      .collection("reviews")
      .getList(1, 50, {
        filter: `book = '${book}'`,
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    setReviewsData(resultList.items);
  };

  const [usersData, setUsersData] = useState([]);
  const fetchAllUsers = async () => {
    const resultList = await pb.collection("users").getList(1, 50, {
      filter: "",
    });
    setUsersData(resultList.items);
  };

  useEffect(() => {
    fetchAllReviews();
    fetchAllUsers();
  }, []);

  return (
    <>
      <div className="w-4/5">
        {reviewsData.map((reviews, index) => {
          let writer;

          if (usersData.length > 0) {
            writer = usersData.find((users) => users.id == reviews.user);
          }
          return (
            <div
              key={index}
              className="mt-3 mb-3 flex h-fit w-full flex-col rounded-lg border bg-white py-2 px-3 shadow"
            >
              <div className="flex flex-col items-stretch gap-4">
                <Review
                  rating={reviews.rating}
                  user={writer}
                  review={reviews.review}
                  date={reviews.created}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
