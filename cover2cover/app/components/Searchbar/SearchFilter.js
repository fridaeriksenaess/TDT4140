import React, { useEffect, useState } from "react";
import Link from "next/link";
import pb from "@/app/pocketbase";

export default function SearchFilter() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const getBooks = async () => {
    const books = await pb.collection("books").getFullList(200);
    setData(books);
  };

  const [writerData, setWriterData] = useState([]);

  const fetchAllWriter = async () => {
    const writerList = await pb.collection("writer").getList(1, 50, {
      filter: "",
    });
    setWriterData(writerList.items);
  };

  useEffect(() => {
    fetchAllWriter();
    getBooks();
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((item) => {
      const titleMatch = item.title
        .toLowerCase()
        .includes(searchWord.toLowerCase());
      const writerMatch = item.writer.some((writerId) => {
        const writer = writerData.find((writer) => writer.id === writerId);
        return (
          writer && writer.name.toLowerCase().includes(searchWord.toLowerCase())
        );
      });
      return titleMatch || writerMatch;
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setWordEntered("");
    setFilteredData([]);
  };
  return (
    <div>
      <div>
        <input
          id="search"
          placeholder="Search for a book ..."
          value={wordEntered}
          onChange={(e) => handleFilter(e)}
          className="border-formfield h-[30px] w-[223px] rounded-lg pl-4 pr-8"
        ></input>
      </div>
      {wordEntered.length !== 0 && (
        <div className="border-formfie absolute z-10 w-[223px] bg-white">
          <ul className="max-h-64 overflow-x-hidden overflow-y-hidden">
            {filteredData
              .filter((book) => {
                const titleMatch = book.title
                  .toLowerCase()
                  .includes(wordEntered.toLowerCase());
                const writerMatch = book.writer.some((writerId) => {
                  const writer = writerData.find(
                    (writer) => writer.id === writerId
                  );
                  return (
                    writer &&
                    writer.name
                      .toLowerCase()
                      .includes(wordEntered.toLowerCase())
                  );
                });
                return titleMatch || writerMatch;
              })
              .slice(0, 5)
              .map((book, index) => {
                return (
                  <li className="p-2 odd:bg-searchFieldHue" key={index}>
                    <Link
                      onClick={clearInput}
                      className="mt-8 hover:underline"
                      href={`/books/${book.id}`}
                    >
                      <p>{book.title}</p>
                      <p className="text-gray-600 text-sm">
                        {book.writer
                          .map(
                            (writerId) =>
                              writerData.find(
                                (writer) => writer.id === writerId
                              )?.name
                          )
                          .join(", ")}
                      </p>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
