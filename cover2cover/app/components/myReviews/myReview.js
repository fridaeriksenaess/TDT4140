import Link from "next/link";
import pb from "@/app/pocketbase";
import CreateNewReview from "@/app/components/myReviews/createNewreview";
import { useState, useEffect } from "react";

export default function Review(props) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (pb.authStore.isValid) {
      const user = pb.authStore.model.id;
      if (user == "d79mfxt09efk15q") {
        setIsAdmin(true);
      }
    }
  });

  function deletReviewA() {
    if (isAdmin) {
      pb.collection("reviews").delete(props.reviewId);
      console.log("Jeg slettet deg");
      window.location.reload(true);
    } else {
      pb.collection("reviews").delete(props.reviewId);
      console.log("Jeg slettet deg");
      window.location.reload(true);
    }
  }

  return (
    <article className="min-w-full max-w-full">
      <div className="mb-4 flex min-w-full items-center space-x-4">
        <img src={props.book?.image} alt="Cover of book" className="w-12"></img>
        <div className="helvetica text-black-700 ml-2 space-y-1 font-bold">
          <p>
            {props.book?.title}
            <time
              dateTime="2014-08-16 19:00"
              className="text-gray-500 dark:text-gray-400 block text-sm"
            >
              {props.date.split(" ")[0]}
            </time>
          </p>
        </div>
      </div>
      <div className="mb-1 flex items-center">
        <svg
          aria-hidden="true"
          className="text-yellow-400 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <p className="pl-3">{props.rating.toFixed(1)}</p>
      </div>

      <p className="text-gray-500 dark:text-gray-400 mb-2 whitespace-pre-line font-light">
        {props.review}
      </p>
      <div className="flex flex-row ">
        <Link
          href={`/createNewReview/${props.reviewId}`}
          className="mx-5 h-7 w-1/4"
        >
          <button className="flex h-full w-full items-center justify-center rounded bg-lightGreen text-center ">
            {" "}
            Edit{" "}
          </button>{" "}
          {/*onClick= {() => deletReviewB()}*/}
        </Link>
        <button
          className="mx-5 flex h-7 w-1/4 items-center justify-center rounded bg-red text-center"
          onClick={() => deletReviewA()}
        >
          {" "}
          Delete{" "}
        </button>
      </div>
    </article>
  );
}
