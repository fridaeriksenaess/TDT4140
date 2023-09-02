"use client";
import React from "react";
import CreateReview from "@/app/components/createReview";

export default function Home(props) {
  return (
    <div className="flex h-1/3 w-full justify-center">
      <CreateReview book={props.params.id} />
    </div>
  );
}
