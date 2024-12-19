import React, { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Filter from "./components/Filter";
import { Book } from "./types";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [filter, setFilter] = useState<{ genre?: string; author?: string }>({});

  const addOrUpdateBook = (book: Book) => {
    if (editingBook) {
      setBooks(books.map((b) => (b.id === book.id ? book : b)));
      setEditingBook(null);
    } else {
      setBooks([...books, book]);
    }
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    return (
      (!filter.genre || book.genre === filter.genre) &&
      (!filter.author || book.author.toLowerCase().includes(filter.author.toLowerCase()))
    );
  });

  const genres = Array.from(new Set(books.map((book) => book.genre)));

  return (
    <div>
      <h1>Bookstore Inventory</h1>
      <BookForm onSubmit={addOrUpdateBook} editingBook={editingBook} onCancel={() => setEditingBook(null)} />
      <Filter genres={genres} onFilterChange={(filter) => setFilter({ ...filter })} />
      <BookList books={filteredBooks} onEdit={setEditingBook} onDelete={deleteBook} />
    </div>
  );
};

export default App;