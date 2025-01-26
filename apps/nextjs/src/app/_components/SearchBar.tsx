import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Props = {
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ setSearch } : Props) => {
  const [input, setInput] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 300); 
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-full flex-shrink-0 items-center rounded-lg border border-gray-400 px-1">
        <img src="search.png" alt="search icon" className="mr-2 h-6" />
        <input
          type="text"
          className="w-full bg-transparent text-black outline-none"
          value={input}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
