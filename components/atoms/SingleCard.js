import Image from "next/image";
import Link from "next/link";

export default function SingleCardThumb({ deck }) {
  return (
    <button
      type="button"
      className={` bg-gray-800 relative aspect-w-4 aspect-h-5  ${
        !deck ? "animate-pulse" : ""
      }`}
    >
      {deck ? (
        <Image src={deck.card_order[0]} alt={deck.deck_title} layout="fill" />
      ) : (
        <></>
      )}
      {deck ? (
        <Link href={`/d/${deck.id}`}>
          <div className="absolute inset-0 flex p-2 justify-end flex-col bg-gradient-to-t from-indigo-800 via-transparent text-white font-inter text-left font-thin">
            {`${deck.deck_title.slice(0, 40)}${
              deck.deck_title.length > 40 ? "..." : ""
            }`}
          </div>
        </Link>
      ) : (
        <></>
      )}
    </button>
  );
}
