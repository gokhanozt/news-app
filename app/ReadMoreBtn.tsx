"use client";
import { useRouter } from "next/navigation";

type Props = {
  article: Article;
};

function ReadMoreBtn({ article }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const queryString = Object.entries(article)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `/article?${queryString}`;
    // console.log(url); // TODO delete later
    router.push(url);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-orange-400 h-10 rounded-b-lg dark:text-gray-900"
    >
      Read More
    </button>
  );
}

export default ReadMoreBtn;
