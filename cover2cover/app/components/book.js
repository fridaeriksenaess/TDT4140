import Link from "next/link";

export default function Book(props) {
  return (
    <div className="snap-start">
      <Link
        href={`/books/${props.id}`}
        className="border-gray hover:bg-gray-100 block max-h-[450px] min-h-[450px] w-60 border-spacing-2 rounded-lg border bg-white p-2 dark:border-none dark:bg-white/[8%] dark:text-white"
      >
        <div>
          <img className="h-60 w-60 " src={props.image}></img>
          <div className="w-50 block h-20">
            <p className="helvetica text-fill text-black-700 break-words pt-4 pb-2 text-center align-baseline font-semibold">
              {props.title}
            </p>
          </div>

          <div className="flex items-center justify-between pb-1 pr-3">
            <div className="pl-3 pr-3 text-left ">{props.writer.name}</div>

            <div className="relative flex self-start">
              <svg
                className="h-5 w-5 items-end fill-yellowStar"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <p className="helvetica text-black-700 ml-2 text-sm font-medium">
                {props.rating.toFixed(1)}
              </p>
            </div>
          </div>
          <div className="block h-20 pt-2">
            {props.tags.map((tags, index) => {
              return (
                <span
                  className="text-black-700 bg-gray-200 mr-1 mb-1 inline-block rounded-full px-3 py-1 text-sm font-semibold dark:bg-white/[11%]"
                  key={index}
                >
                  {tags}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}
