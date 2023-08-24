function BookCard({ book, isLastBook, onLastBookRef }) {
      return (
        <div 
          className="w-64 m-4 bg-white shadow-md rounded overflow-hidden transform transition duration-500 ease-in-out hover:scale-105"
          ref={isLastBook ? onLastBookRef : null}
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
      );
    }
    
    export default BookCard;
    