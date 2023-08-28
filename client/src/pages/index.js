import { useEffect, useState, useRef, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import LoadingIndicator from '../components/LoadingIndicator';
import { searchBooks } from '../utils/api'; 

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const queryRef = useRef("");

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

  const handleSearch = async (query) => {
    queryRef.current = query;
    setBooks([]);
    setPage(0);
    setHasMore(true);
    setLoading(true); 
    const newBooks = await searchBooks(query);
    setBooks(newBooks);
    setLoading(false); 
  };
  
  useEffect(() => {
    if (page > 0) {
      const fetchMoreBooks = async () => {
        setLoading(true); 
        const moreBooks = await searchBooks(queryRef.current);
        setBooks(prevBooks => [...prevBooks, ...moreBooks]);
        setLoading(false);
      };
      fetchMoreBooks();
    }
  }, [page]);
  

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4">
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center mt-4 -mx-4">
        {books.map((book, index) => (
          <BookCard 
            key={index}
            book={book}
            isLastBook={index === books.length - 1}
            onLastBookRef={lastBookRef} 
          />
        ))}
      </div>
      {loading && <LoadingIndicator />}
    </div>
  );
}
