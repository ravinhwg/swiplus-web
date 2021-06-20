import Image from "next/image";
import Link from "next/link";

export default function SingleCardThumb({ deck }) {
  return (
    <div
      className={` bg-gray-800 aspect-h-5 aspect-w-4 ${
        !deck ? "animate-pulse" : ""
      }`}
    >
      {deck ? (
        <Link href={`/d/${deck.id}`}>
          <img src={deck.card_order[0]} alt={deck.deck_title} layout="fill" />
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
