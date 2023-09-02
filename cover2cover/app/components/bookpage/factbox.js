export default (props) => {
  return (
    <>
      <div className="mt-5 w-full rounded-md bg-lightBlue px-5 py-2">
        <p className="text-3xl font-bold">{props.title}</p>
        <p className="mt-3 text-xl"> {props.author} </p>
        <p>
          Release year: {props.year} , Rating: {props.rating}{" "}
        </p>

        <div className="mt-3">
          <p className="text-2xl font-bold">About the book: </p>{" "}
          {props.description}{" "}
        </div>
      </div>
    </>
  );
};
