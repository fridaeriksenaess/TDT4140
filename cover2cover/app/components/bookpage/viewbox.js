import Link from "next/link";
import pb from "@/app/pocketbase";
import { useEffect, useState } from "react";

export default (props) => {
  const [readList, setReadList] = useState([]);
  const [inReadList, setInReadList] = useState(
    pb.authStore.isValid
      ? pb.authStore.model.readList.includes(props.id)
      : false
  );

  const fetchReadList = async () => {
    if (!pb.authStore.isValid) return;
    const user = await pb.collection("users").getOne(pb.authStore.model.id);
    setReadList(user.readList);
  };

  useEffect(() => {
    fetchReadList();
  }, []);

  const addToReadList = async () => {
    const book = await pb.collection("books").getOne(props.id);
    readList.push(book.id);
    await pb.collection("users").update(pb.authStore.model.id, {
      readList: readList,
    });
    setInReadList(true);
  };

  const removeFromReadList = async () => {
    const book = await pb.collection("books").getOne(props.id);
    let tmp = [];
    for (const b of readList) {
      if (b !== book.id) {
        tmp.push(b);
      }
    }
    await pb.collection("users").update(pb.authStore.model.id, {
      readList: tmp,
    });
    setInReadList(false);
  };

  const addOrRemoveBtn = () => {
    return !inReadList ? (
      <button
        onClick={addToReadList}
        className="flex h-14 w-1/3 items-center justify-center rounded bg-lightBlue text-center font-bold"
      >
        Add to your list
      </button>
    ) : (
      <button
        onClick={removeFromReadList}
        className="flex h-14 w-1/3 items-center justify-center rounded bg-lightBlue text-center font-bold"
      >
        Remove from your list
      </button>
    );
  };

  return (
    <div className=" mt-10 flex h-4/5 w-1/2 flex-col items-center bg-white">
      <img
        src={props.img}
        style={{ minHeight: "350px", maxHeight: "400px" }}
      ></img>
      <div className=" flex w-full flex-row justify-center space-x-5 pt-3 ">
        <Link
          href={`/reviews/${props.id}`}
          className="flex h-14 w-1/3 items-center justify-center rounded bg-lightBlue text-center font-bold"
        >
          Give Rating
        </Link>
      </div>
      <div className="flex w-full flex-row justify-center space-x-5 pt-3">
        {addOrRemoveBtn()}
      </div>
    </div>
  );
};
