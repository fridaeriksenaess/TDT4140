"use client";
import { useState, useEffect } from "react";
import pb from "@/app/pocketbase";
import ShowMyReviews from "@/app/components/myReviews/showMyReviews";
import ShowAllReviews from "@/app/components/myReviews/showAllReviews";

export default function Home({ params }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (pb.authStore.isValid) {
      const user = pb.authStore.model.id;
      if (user == "d79mfxt09efk15q") {
        setIsAdmin(true);
      }
    }
  });

  const id = params.id;
  return (
    <>
      <div className="flex w-1/2 flex-col items-center rounded-md bg-lightBlue px-3 py-3">
        <p className="text-xl font-bold">
          {isAdmin ? "All Reviews" : "Your Reviews"}:{" "}
        </p>

        {isAdmin ? <ShowAllReviews /> : <ShowMyReviews user={id} />}
      </div>
    </>
  );
}
