import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBooks('harry+potter');
    fetchBooks('sherlock+holmes');
  }, []);

  const fetchBooks = async (query) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await response.json();
      if (data.items) {
        setBooks(prevBooks => [...prevBooks, ...data.items]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = () => {
    setBooks([]);
    fetchBooks(searchQuery);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Online Bookstore</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <div className="book-list">
        {/* Map through books and display */}
        {books.map(book => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

function BookItem({ book }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`book ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
      <h2>{book.volumeInfo.title}</h2>
      {expanded && (
        <div className="book-details">
          <p>{book.volumeInfo.authors.join(', ')}</p>
          <p>{book.volumeInfo.description}</p>
          <div className="buttons">
            <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
              Read Now
            </a>
            <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
