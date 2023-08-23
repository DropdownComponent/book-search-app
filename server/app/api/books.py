from fastapi import APIRouter
from app.services import google_books

router = APIRouter()

@router.get("/search/{query}")
def search_books(query: str):
    return {"message": f"Searching for books with query: {query}"}
