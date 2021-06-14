export default function SingleCardThumb({ shimmer }) {
  return (
    <div
      className={` bg-gray-800 aspect-h-5 aspect-w-4 ${
        shimmer ? "animate-pulse" : ""
      }`}
    />
  );
}
