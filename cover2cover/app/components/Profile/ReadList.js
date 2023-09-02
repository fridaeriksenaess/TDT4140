import pb from "@/app/pocketbase";
import { useRef, useState, useEffect } from "react";
import Book from "@/app/components/book";

export default (props) => {
  const [booksData, setBooksData] = useState([]);

  const fetchAllBooks = async () => {
    let res = [];

    for (const book of pb.authStore.model.readList.reverse()) {
      console.log(book);
      const tmp = await pb
        .collection("books")
        .getOne(book, { expand: "writer" });
      res.push(tmp);
    }
    setBooksData(res);
  };

  const ref = useRef(null);
  const scroll = (amnt) => {
    ref.current.scrollLeft += amnt;
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

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
          return (
            <Book
              title={b.title}
              genre={b.genre}
              image={b.image}
              tags={b.tags}
              rating={b.rating}
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
};
