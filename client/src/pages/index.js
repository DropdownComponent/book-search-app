import { useEffect, useState } from 'react';
export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchBooks = async () => {
    const response = await fetch(`http://127.0.0.1:8000/books/search/${query}`);
    const data = await response.json();
    setBooks(data);
    fetchRecentSearches();
  };

  const fetchRecentSearches = async () => {
    const response = await fetch('http://127.0.0.1:8000/books/recent-searches');
    const data = await response.json();
    setRecentSearches(data.recent_searches);
    console.log("Fetched recent searches:", data.recent_searches);
  };
  useEffect(() => {
    fetchRecentSearches();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className="p-2 border rounded"
        placeholder="Search for books..."
      />
      {showSuggestions && (
        <div className="border rounded mt-2 absolute bg-white">
          {recentSearches.map((search, index) => (
            <div key={index} onClick={() => setQuery(search)} className="p-2 hover:bg-gray-200 cursor-pointer">
              {search}
            </div>
          ))}
        </div>
      )}
      <button onClick={searchBooks} className="p-2 bg-blue-500 text-white ml-2 rounded">Search</button>

      <div className="flex flex-wrap justify-center mt-4">
        {books.map((book, index) => (
          <div key={index} className="max-w-xs bg-white shadow-md rounded-md overflow-hidden m-4">
            {book.thumbnail && (
              <img src={book.thumbnail} alt={book.title} className="w-full" />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-sm mb-2"><strong>Authors:</strong> {book.authors.join(", ")}</p>
              <p className="text-sm truncate">{book.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
