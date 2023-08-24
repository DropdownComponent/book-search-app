import { useEffect, useState, useRef, useCallback } from 'react';

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const observer = useRef();
  const lastBookRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleSearch = () => {
    if (!query.trim()) {
        return;
    }
    setBooks([]);
    setPage(0);
    setHasMore(true);
    searchBooks(0);
};

  const searchBooks = async (page = 0) => {
    setLoading(true);
    const response = await fetch(`http://127.0.0.1:8000/books/search/${query}?startIndex=${page * 10}`);
    const data = await response.json();

    if (Array.isArray(data)) {
        setBooks(prevBooks => [...prevBooks, ...data]);
        if (data.length < 10) setHasMore(false);
    } else {
        setHasMore(false);
    }

    setLoading(false);
};


  useEffect(() => {
    if (page > 0) {
      searchBooks(page);
    }
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        }}
        className="p-2 border rounded w-full"
        placeholder="Search for books..."
      />
      <button onClick={handleSearch} className="p-2 bg-blue-500 text-white ml-2 mt-2 rounded">Search</button>

      <div className="flex flex-wrap justify-center mt-4">
        {books.map((book, index) => (
          <div 
            key={index} 
            className="max-w-xs bg-white shadow-md rounded-md overflow-hidden m-4"
            ref={index === books.length - 1 ? lastBookRef : null}
          >
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
      {loading && <div className="text-center mt-4 text-lg">Loading more books...</div>}
    </div>
  );
}
