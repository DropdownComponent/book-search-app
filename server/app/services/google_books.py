import httpx

BASE_URL = "https://www.googleapis.com/books/v1/volumes"

async def search_google_books(query: str):
    params = {"q": query}
    async with httpx.AsyncClient() as client:
        response = await client.get(BASE_URL, params=params)
        return response.json()
