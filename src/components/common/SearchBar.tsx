export default function SearchBar() {
  return (
    <div className="relative max-w-sm w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search lessons..."
        className="block w-full bg-white border border-gray-200 rounded-lg py-2.5 pl-10 pr-3 
                  text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-blue-500 transition duration-150 ease-in-out shadow-sm"
      />
      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
        <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}
