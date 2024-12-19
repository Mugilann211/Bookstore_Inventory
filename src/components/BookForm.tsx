import React, { useState, useEffect } from "react";
import { Book } from "../types";

interface BookFormProps {
  onSubmit: (book: Book) => void;
  editingBook?: Book | null;
  onCancel?: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, editingBook, onCancel }) => {
  const [book, setBook] = useState<Book>(
    editingBook || { id: Date.now(), title: "", author: "", genre: "", price: 0 }
  );

  useEffect(() => {
    if (editingBook) {
      setBook(editingBook);
    }
  }, [editingBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(book);
    setBook({ id: Date.now(), title: "", author: "", genre: "", price: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
      <select name="genre" value={book.genre} onChange={handleChange} required>
        <option value="">Select Genre</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>
      <input
        type="number"
        name="price"
        value={book.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <button type="submit">{editingBook ? "Update" : "Add"} Book</button>
      {editingBook && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default BookForm;