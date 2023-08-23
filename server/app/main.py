from fastapi import FastAPI
from app.api import books

app = FastAPI()

app.include_router(books.router, prefix="/books", tags=["books"])

@app.get("/")
def read_root():
    return {"Hello": "World"}
