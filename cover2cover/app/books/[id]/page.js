"use client";
import React from "react";
import FactBox from "@/app/components/bookpage/factbox";
import ViewBox from "@/app/components/bookpage/viewbox";
import { useState, useEffect } from "react";
import pb from "@/app/pocketbase";
import ShowReviews from "@/app/components/showReviews";

const calcAvrRating = (id, reviews) => {};

export default ({ params }) => {
  const [book, setBookData] = useState([]);
  const [writerName, setWriterName] = useState("");
  const [vurd, setVurd] = useState("");

  const fetchBook = async () => {
    try {
      const result = await pb.collection("books").getOne(params.id, {
        expand: "writer, description, vurd",
      });
      setWriterName(result.expand.writer[0].name);
      setBookData(result);
      const ratings = result.expand.vurd.map((item) => item.rating);
      const averageRating =
        ratings.reduce((sum, rating) => sum + rating) / ratings.length;
      setVurd(parseFloat(averageRating.toFixed(1)));
    } catch (error) {
      console.error("Error fetching book data", error);
    }
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

  const [rating, setRating] = useState(null);

  useEffect(() => {
    let ratings = reviewsData
      .filter((review) => review.book == book.id)
      .map((r) => r.rating);
    let rating = ratings.reduce((sum, r) => sum + r, 0) / ratings.length || 0;

    setRating(rating.toFixed(1));
  }, [book, reviewsData]);

  useEffect(() => {
    fetchBook();
    fetchAllReviews();
  }, []);

  return (
    <div className=" flex w-full flex-col items-center">
      <div className=" flex  w-full flex-row justify-center ">
        <ViewBox img={book.image} id={params.id} />

        <div className=" flex w-1/2  flex-col items-center pb-20">
          <FactBox
            title={book.title}
            author={writerName}
            year={book.released}
            rating={rating}
            description={
              <div dangerouslySetInnerHTML={{ __html: book.description }} />
            }
          />
          <div className="mt-3 flex w-full flex-col items-center rounded-md bg-sand">
            <h4 className=" relative mt-5 font-bold">Ratings and comments:</h4>
            <ShowReviews book={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
