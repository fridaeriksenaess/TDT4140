import { useEffect } from "react";

function FilterBar({
  allBooks,
  activeGenre,
  setActiveGenre,
  setFilteredBooks,
  setLimit,
}) {
  useEffect(() => {
    if (activeGenre === "All") {
      setFilteredBooks(allBooks);
    } else {
      const filteredBooks = allBooks.filter(
        (book) => book.genre === activeGenre
      );
      setFilteredBooks(filteredBooks);
    }
  }, [activeGenre]);

  const focusButton = (genre) => {
    return `${
      activeGenre === genre
        ? "bg-brown dark:bg-sand hover:bg-brown dark:hover:bg-sand font-bold py-2 px-4 rounded-full border m-1"
        : "bg-sand dark:bg-brown hover:bg-brown dark:hover:bg-sand font-bold py-2 px-4 rounded-full border m-1"
    }`;
  };

  return (
    <div className="m-5">
      <button
        onClick={() => {
          setActiveGenre("All");
          setLimit(12);
        }}
        className={focusButton("All")}
      >
        All
      </button>
      <button
        onClick={() => {
          setActiveGenre("Novel");
          setLimit(12);
        }}
        className={focusButton("Novel")}
      >
        Novel
      </button>
      <button
        onClick={() => {
          setActiveGenre("Investments");
          setLimit(12);
        }}
        className={focusButton("Investments")}
      >
        Investments
      </button>
      <button
        onClick={() => {
          setActiveGenre("Fiction");
          setLimit(12);
        }}
        className={focusButton("Fiction")}
      >
        Fiction
      </button>
      <button
        onClick={() => {
          setActiveGenre("Non-Fiction");
          setLimit(12);
        }}
        className={focusButton("Non-Fiction")}
      >
        Non-Fiction
      </button>
      <button
        onClick={() => {
          setActiveGenre("Business & Economics");
          setLimit(12);
        }}
        className={focusButton("Business & Economics")}
      >
        Business & Economics
      </button>
      <button
        onClick={() => {
          setActiveGenre("Crime");
          setLimit(12);
        }}
        className={focusButton("Crime")}
      >
        Crime
      </button>
      <button
        onClick={() => {
          setActiveGenre("Fantasy");
          setLimit(12);
        }}
        className={focusButton("Fantasy")}
      >
        Fantasy
      </button>
    </div>
  );
}

export default FilterBar;
