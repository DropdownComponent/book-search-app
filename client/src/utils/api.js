export const searchBooks = async (query, page = 0) => {
  const baseURL = "https://book-search-app-api-server.onrender.com";
  const response = await fetch(`${baseURL}/books/search/${query}?startIndex=${page * 10}`);
  return await response.json();
}

    