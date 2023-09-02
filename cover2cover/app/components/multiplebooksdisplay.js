"use client";
import Book from "@/app/components/book.js";
import { useState, useEffect, useRef } from "react";
import pb from "@/app/pocketbase";

export default function MultipleBooks(props) {
  const sortType = { recent: "-created", top10: "-rating" };

  const [booksData, setBooksData] = useState([]);
  const fetchAllBooks = async () => {
    const resultList = await pb.collection("books").getList(1, 10, {
      sort: sortType[props.type],
      expand: "writer",
    });
    console.log(resultList);
    setBooksData(resultList.items);
  };

  const [reviewsData, setReviewsData] = useState([]);
  const fetchAllReviews = async () => {
    // fetch a paginated records list
    const resultList = await pb
      .collection("reviews")
      .getList(1, 50, {
        filter: ``,
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

  const getRatingById = (id) => {
    const review = reviewsData.find((r) => r.id === id);
    return review ? review.rating : 0;
  };

  const ref = useRef(null);

  const scroll = (amnt) => {
    ref.current.scrollLeft += amnt;
  };

  return (
    <div className="h-70 w-min-content bg-inherit relative flex flex-row items-center justify-between rounded-lg p-2">
      <button
        className="bg-transparent min-h-[466px] w-6 text-4xl font-thin"
        onClick={() => scroll(-245)}
      >
        {`<`}
      </button>
      <div
        ref={ref}
        className="bg-transparent mx-1 flex snap-x snap-mandatory flex-row items-stretch gap-4 overflow-y-hidden overflow-x-scroll scroll-smooth no-scrollbar"
      >
        {booksData.map((b, index) => {
          let ratings = reviewsData
            .filter((review) => review.book == b.id)
            .map((r) => r.rating);

          let avgRating =
            ratings.reduce((sum, r) => sum + r, 0) / ratings.length || 0;

          return (
            <Book
              title={b.title}
              genre={b.genre}
              image={b.image}
              tags={b.tags}
              rating={avgRating}
              writer={b.expand.writer[0]}
              id={b.id}
              key={index}
            />
          );
        })}
      </div>
      <button
        className="bg-transparent min-h-[466px] w-6 text-4xl font-thin"
        onClick={() => scroll(245)}
      >
        {`>`}
      </button>
    </div>
  );
}
