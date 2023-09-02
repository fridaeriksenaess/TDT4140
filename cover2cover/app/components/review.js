import avatar from "@/public/avatar.png";
import Image from "next/image";

export default function Review(props) {
  return (
    <article className="min-w-full max-w-full">
      <div className="mb-4 flex min-w-full items-center space-x-4">
        <Image
          className="h-10 w-10 justify-start rounded-full"
          src={avatar}
          alt="avatar"
        />
        <div className="helvetica text-black-700 ml-2 space-y-1 font-bold">
          <p>
            {props.user?.username}
            <time
              dateTime="2014-08-16 19:00"
              className="text-gray-500 dark:text-gray-400 block text-sm"
            >
              {props.date.split(" ")[0]}
            </time>
          </p>
        </div>
      </div>
      <div className="mb-1 flex items-center">
        <svg
          aria-hidden="true"
          className="text-yellow-400 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <p className="pl-3">{props.rating}</p>
      </div>

      <p className="text-gray-500 dark:text-gray-400 mb-2 whitespace-pre-line font-light">
        {props.review}
      </p>
    </article>
  );
}
