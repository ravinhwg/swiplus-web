export default function SrarchBar() {
  return (
    <div className=" flex self-center focus:outline-none">
      <input
        type="text"
        placeholder="Search Swiplus"
        className=" w-96 px-4 py-3 h-9 placeholder-blueGray-300 text-blueGray-600 relative bg-gray-700 rounded text-sm border-0 shadow outline-none focus:outline-none focus:bg-gray-600 focus:ring "
      />
    </div>
  );
}
