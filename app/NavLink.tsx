import Link from "next/link";

type Props = {
  category: string;
  isActive: boolean;
};

function Navlink({ category, isActive }: Props) {
  return (
    <Link
      href={`/news/${category}`}
      className={`navLink ${
        isActive &&
        "underline decoration-orange-400 underline-ofset-4 font-bold text-lg"
      }`}
    >
      {category}
    </Link>
  );
}

export default Navlink;