import Link from 'next/link';

function ItemNotFound() {
  return (
    <div className="grid h-screen bg-gray-50 place-content-center">
      <h1 className="tracking-widest text-gray-500 uppercase">
        404 | Post Not Found
      </h1>
      <Link
        href="/"
        className="inline-block px-20 py-3 mt-5 text-sm font-medium text-white bg-gray-600 border border-gray-600 rounded hover:bg-gray-500 hover:text-gray-100 focus:outline-none focus:ring active:text-gray-500"
      >
        Go back
      </Link>
    </div>
  );
}

export default ItemNotFound;
