const SearchBar = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-[90%] flex-shrink-0 items-center rounded-lg border border-gray-400 px-1">
        <img src="search.png" alt="search icon" className="mr-2 h-6" />
        <input
          type="text"
          className="w-full bg-transparent text-black outline-none"
        />
      </div>
      <img src="sort.png" alt="sort the search" className="mr-3 h-6" />
    </div>
  );
};

export default SearchBar;
