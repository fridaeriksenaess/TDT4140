"use client";
import Book from "@/app/components/book.js";
import FilterBar from "@/app/components/FilterBar.js";
import { useState, useEffect } from "react";
import pb from "@/app/pocketbase";

export default function FilterBooks(props) {
  const sortType = { recent: "-created", top10: "-rating" };

  const [allBooks, setAllBooks] = useState([]);
  const [writerData, setWriterData] = useState([]);

  const [filteredBooks, setFilteredBooks] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");
  //Limit for amount of books shown
  const [limit, setLimit] = useState(12);

  //To allow conditional styling on loadMore-button
  const loadMoreButtonStyle = () => {
    return `${
      limit > books.length
        ? "bg-sand dark:bg-brown hover:bg-brown dark:hover:bg-sand font-bold py-2 px-4 rounded-full border m-5 invisible"
        : "bg-sand dark:bg-brown hover:bg-brown dark:hover:bg-sand font-bold py-2 px-4 rounded-full border m-5"
    }`;
  };

  const fetchAllBooks = async () => {
    const resultList = await pb.collection("books").getList(1, 40, {
      sort: sortType[props.type],
    });
    setAllBooks(resultList.items);
  };

  const fetchAllWriter = async () => {
    const writerList = await pb.collection("writer").getList(1, 50, {
      filter: "",
    });
    setWriterData(writerList.items);
  };

  useEffect(() => {
    fetchAllWriter();
    fetchAllBooks();
  }, []);

  //In order to show books when rendering the page for the first time
  let books = [];
  if (filteredBooks.length === 0) {
    books = allBooks.slice(0, limit);
  } else {
    books = filteredBooks.slice(0, limit);
  }

  return (
    <div>
      <FilterBar
        allBooks={allBooks}
        setFilteredBooks={setFilteredBooks}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        setLimit={setLimit}
      />
      <div className="grid grid-cols-4 gap-5">
        {books.map((b, index) => {
          let writer = [];
          if (writerData.length > 0)
            b.writer.forEach((author) =>
              writer.push(
                writerData.find((writer) => {
                  return writer.id == author;
                })
              )
            );

          return (
            <Book
              title={b.title}
              genre={b.genre}
              image={b.image}
              tags={b.tags}
              rating={b.rating}
              writer={writer[0]}
              id={b.id}
              key={index}
            />
          );
        })}
      </div>
      <button
        onClick={() => setLimit(limit + 4)}
        className={loadMoreButtonStyle()}
      >
        Load more books
      </button>
    </div>
  );
}
