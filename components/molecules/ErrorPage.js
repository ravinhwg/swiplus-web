export default function ErrorPage() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-white font-inter text-6xl">its 404 😢 </h1>
      <h1 className="text-white font-inter text-xl text-center max-w-md">
        Are you lost? The page you are trying to access is moved or does not
        exist.
      </h1>
    </div>
  );
}
