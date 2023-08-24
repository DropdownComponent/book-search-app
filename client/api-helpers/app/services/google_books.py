import httpx

BASE_URL = "https://www.googleapis.com/books/v1/volumes"
RECENT_SEARCHES = []

def add_to_recent_searches(query: str):
    global RECENT_SEARCHES
    if query not in RECENT_SEARCHES:
        RECENT_SEARCHES.append(query)
    RECENT_SEARCHES = RECENT_SEARCHES[-10:]

async def search_google_books(query: str, startIndex: int = 0):
    add_to_recent_searches(query)
    params = {"q": query, "startIndex": startIndex}
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(BASE_URL, params=params)
            response.raise_for_status()
            data = response.json()

            if not data.get("items"):
                return []

            books = data.get("items", [])
            processed_books = []
            for book in books:
                volume_info = book.get("volumeInfo", {})
                title = volume_info.get("title", "N/A")
                authors = volume_info.get("authors", ["Unknown"])
                description = volume_info.get("description", "No description available.")
                thumbnail = volume_info.get("imageLinks", {}).get("thumbnail", None)

                processed_books.append({
                    "title": title,
                    "authors": authors,
                    "description": description,
                    "thumbnail": thumbnail
                })

            return processed_books
        except httpx.HTTPError as e:
            print(f"An error occurred: {e}")
            return []
