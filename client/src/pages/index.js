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

    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4">
  
      <div className="mb-4">
      
        <input
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }  
          }}
          className="w-full p-2 border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for books..."  
        />
  
        <button
          onClick={handleSearch}
          className="p-2 ml-2 mt-2 text-white bg-blue-500 rounded shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 hover:animate-spin active:animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
        </button>
  
      </div>
  
      <div className="flex flex-wrap justify-center mt-4 -mx-4">
      
        {books.map((book, index) => (
        
          <div 
            key={index}
            className="w-64 m-4 bg-white shadow-md rounded overflow-hidden transform transition duration-500 ease-in-out hover:scale-105"
            ref={index === books.length - 1 ? lastBookRef : null} 
          >
          
            {book.thumbnail && (
              <div className="h-56 rounded-t">
                <img 
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-4 bg-gray-100 h-48 overflow-y-auto">
  
              <h2 className="mb-2 text-xl font-medium">{book.title}</h2>
  
              <div className="border-b border-gray-200" />
  
              <p className="mt-2 text-base leading-relaxed">
                <strong>Authors:</strong> {book.authors.join(", ")}
              </p>
  
              <p className="mt-2 text-base leading-relaxed">
                {book.description}
              </p>
  
            </div>
          
          </div>
          
        ))}
        
      </div>
  
      {loading && (
      
        <div className="flex justify-center items-center mt-8">
        
          <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        
        </div>
        
      )}
  
    </div>
  
  );
}