import {useState} from 'react';
function SearchBar({ onSearch }) {
      const [query, setQuery] = useState("");
    
      const handleSearch = () => {
        if (!query.trim()) return;
        onSearch(query);
      };
    
      return (
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for books..."
          />
          <button
            onClick={handleSearch}
            className="p-2 ml-2 mt-2 text-white bg-blue-500 rounded shadow-md hover:bg-blue-600 transition duration-200 ease-in-out">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 hover:animate-spin active:animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      );
    }
    
    export default SearchBar;
    