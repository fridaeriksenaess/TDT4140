"use client";
import React from "react";
import CreateNewReview from "@/app/components/myReviews/createNewreview";

export default function Home(props) {
  console.log(props);
  return (
    <div className="flex h-1/3 w-full justify-center">
      <CreateNewReview review={props.params.id} />
    </div>
  );
}