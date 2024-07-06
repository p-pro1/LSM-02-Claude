import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white text-lg">City Events</span>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/" className="py-4 px-2 text-white hover:text-gray-200 transition duration-300">Home</Link>
            <Link href="/add-event" className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300">Add Event</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;