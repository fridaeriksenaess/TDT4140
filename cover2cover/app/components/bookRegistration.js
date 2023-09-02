"use client";
import { useState, useEffect } from "react";
import pb from "@/app/pocketbase";

export default function BookRegistration() {
  const [booksData, setBooksData] = useState([]);
  const fetchAllBooks = async () => {
    // fetch a paginated records list
    const resultList = await pb.collection("books").getList(1, 100, {
      filter: "",
    });
    setBooksData(resultList.items);
  };

  const [authorsData, setAuthorsData] = useState([]);
  const fetchAllAuthors = async () => {
    // fetch a paginated records list
    const resultList = await pb.collection("writer").getList(1, 100, {
      filter: "",
    });
    setAuthorsData(resultList.items);
  };

  useEffect(() => {
    fetchAllBooks();
    fetchAllAuthors();
  }, []);

  //Saving input data upon change
  const [inputData, setInputState] = useState({
    title: "",
    tags: "",
    image: "",
    released: "",
    genre: "",
  });

  const tagList = [
    "Fantasy",
    "Crime",
    "History",
    "Romance",
    "Kids",
    "Inspirational",
    "Novel",
    "Classic",
    "Bestceller",
    "Thriller",
    "Autobiography",
    "Science fiction",
    "Comedy",
    "Educational",
    "Theory",
    "Business",
    "Economics",
    "Finance",
    "Science",
    "Astronomy",
    "Technology",
    "Politics",
  ];

  const [selectedOption, setSelectedOption] = useState({
    author: "",
  });

  const [selectedTextField, setSelectedTextField] = useState({
    description: "",
  });

  const [tag1, setTag1] = useState({
    tag: "",
  });

  const [tag2, setTag2] = useState({
    tag: "",
  });

  const [tag3, setTag3] = useState({
    tag: "",
  });

  const existsBook = () => {
    let foundExistingBook = false;
    booksData.forEach((book) => {
      if (
        book.title.trim().toUpperCase() ==
          inputData.title.trim().toUpperCase() &&
        book.writer == selectedOption
      ) {
        foundExistingBook = true;
      }
    });
    return foundExistingBook;
  };

  const checkTags = () => {
    if (tag1 == "Select tag") {
      setTag1("");
    }
    if (tag2 == "Select tag") {
      setTag2("");
    }
    if (tag3 == "Select tag") {
      setTag3("");
    }
  };

  const invalidInput = () => {
    let foundInvalidInput = false;

    if (
      inputData.title == "" ||
      selectedOption.author == "" ||
      /^(https:|http:|www\.)\S*/.test(inputData.image) == false ||
      /^[0-9]*$/.test(inputData.released) == false
    ) {
      foundInvalidInput = true;
    }
    return foundInvalidInput;
  };

  //saves review in database
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (existsBook()) {
      alert("This book is allready registred!");
    } else if (invalidInput()) {
      alert("Invalid input");
    } else {
      checkTags();
      await pb.collection("books").create({
        title: inputData.title,
        writer: selectedOption,
        tags: [tag1, tag2, tag3],
        image: inputData.image,
        released: inputData.released,
        genre: inputData.genre,
        rating: 0.0,
        description: selectedTextField,
      });

      await fetchAllBooks();
      await fetchAllAuthors();
      alert("Book succesfully added to cover2cover!");
    }
  };

  //Handles changes in input fields
  function handleChange(evt) {
    const value = evt.target.value;
    setInputState({
      ...inputData,
      [evt.target.name]: value,
    });
  }

  return (
    <div className="block w-full">
      <h1 className="pb-4 text-center font-bold">ADD NEW BOOK</h1>
      <div className="mb-3 grid gap-6 md:grid-cols-2">
        <div className="px-4 pb-4 ">
          <div>
            <label
              for="title"
              className=" mb-2 block text-center text-sm font-medium "
            >
              TITLE
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border-gray-300  dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm focus:border-inputFieldBlue focus:ring-inputFieldBlue dark:focus:ring-inputFieldBlue"
              placeholder="Some title"
              name="title"
              value={inputData.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="px-4 pb-4 ">
          <div>
            <label
              for="image"
              className=" mb-2 block text-center text-sm font-medium "
            >
              IMAGE URL
            </label>
            <input
              type="text"
              id="image"
              className="bg-gray-50 border-gray-300  dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm focus:border-inputFieldBlue focus:ring-inputFieldBlue dark:focus:ring-inputFieldBlue"
              placeholder="Some image url"
              name="image"
              value={inputData.image}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="px-4 pb-4 ">
          <div>
            <label
              for="release"
              className=" mb-2 block text-center text-sm font-medium "
            >
              RELEASED
            </label>
            <input
              type="text"
              id="release"
              className="bg-gray-50 border-gray-300 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm focus:border-inputFieldBlue focus:ring-inputFieldBlue dark:focus:ring-inputFieldBlue"
              placeholder="2022"
              name="released"
              value={inputData.released}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="px-4 pb-4 ">
          <div>
            <label
              for="genre"
              className="mb-2 block text-center text-sm font-medium"
            >
              GENRE
            </label>
            <input
              type="text"
              id="genre"
              className="bg-gray-50 border-gray-300 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm focus:border-inputFieldBlue focus:ring-inputFieldBlue dark:focus:ring-inputFieldBlue"
              placeholder="Crime"
              name="genre"
              value={inputData.genre}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-3 grid px-2 md:grid-cols-3">
        <div className="px-2 pb-4 ">
          <label
            for="tag1"
            className=" mb-2 block text-center text-sm font-medium"
          >
            TAG 1
          </label>
          <select
            value={tag1.tag}
            onChange={(e) => setTag1(e.target.value)}
            className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border text-sm dark:text-white"
          >
            <option>Select tag</option>
            {tagList.map((tag) => {
              return (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              );
            })}
          </select>
        </div>

        <div className="px-2 pb-4 ">
          <label
            for="tag2"
            className=" mb-2 block text-center text-sm font-medium"
          >
            TAG 2
          </label>
          <select
            value={tag2.tag}
            onChange={(e) => setTag2(e.target.value)}
            className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border text-sm dark:text-white"
          >
            <option>Select tag</option>
            {tagList.map((tag) => {
              return (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              );
            })}
          </select>
        </div>

        <div className="px-2 pb-4 ">
          <label
            for="tag1"
            className=" mb-2 block text-center text-sm font-medium"
          >
            TAG 3
          </label>
          <select
            value={tag3.tag}
            onChange={(e) => setTag3(e.target.value)}
            className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border text-sm dark:text-white"
          >
            <option>Select tag</option>
            {tagList.map((tag) => {
              return (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="px-4 pb-4 ">
        <label for="Author" className=" mb-2 block text-sm font-medium">
          AUTHOR
        </label>
        <select
          value={selectedOption.author}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border text-sm dark:text-white"
        >
          <option>Select author</option>
          {authorsData.map((author) => {
            if (authorsData.length > 0) {
            }
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="px-4 pb-4 ">
        <label for="description" className="mb-2 block text-sm font-medium">
          DESCRIPTION
        </label>
        <textarea
          rows="4"
          className="text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
          placeholder="Enter description"
          name="description"
          value={selectedTextField.description}
          onChange={(e) => setSelectedTextField(e.target.value)}
        ></textarea>
      </div>

      <div className="block items-center px-4 pb-4 ">
        <a
          id="submitButton"
          onClick={handleSubmit}
          href="#"
          className="focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-mediumfocus:outline-none float-right rounded-lg bg-btnBlue px-5 py-3 text-center text-sm hover:bg-btnHoverBlue focus:ring-4"
        >
          ADD BOOK
        </a>
      </div>
    </div>
  );
}
