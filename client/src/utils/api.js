export const searchBooks = async (query, page = 0) => {
      const response = await fetch(`http://127.0.0.1:8000/books/search/${query}?startIndex=${page * 10}`);
      return await response.json();
    }
    