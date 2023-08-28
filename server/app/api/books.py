from fastapi import APIRouter, HTTPException
from ..services import google_books


router = APIRouter()

@router.get("/search/{query}")
async def search_books(query: str):
    try:
        results = await google_books.search_google_books(query)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error fetching data from Google Books API")
