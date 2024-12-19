import React from "react";
import { Book } from "../types";

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title} by {book.author} - {book.genre} (${book.price})
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={() => onDelete(book.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;