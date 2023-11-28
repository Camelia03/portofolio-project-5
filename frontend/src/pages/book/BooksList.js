import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BookListItem from "../../components/BookListItem";
import useReq from "../../hooks/useReq";

const BooksList = ({ ordering = "", searchQuery = "", genre = "" }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const { data: books } = useReq(
    `/api/books?search=${searchQuery}&genres__name=${genre}&ordering=${ordering}&page=${page}`
  );

  useEffect(() => {
    setItems([]);
    setPage(1);
  }, [ordering, searchQuery]);

  useEffect(() => {
    if (!books) return;

    setItems((prevItems) => {
      return [...prevItems, ...books.results];
    });
  }, [books]);

  const fetchData = () => {
    if (!books?.next) return;

    setPage((prevPage) => prevPage + 1);
  };

  if (!books) return null;

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={items.length < books.count}
        loader={<div>Loading...</div>}
        endMessage={<p>No more data to load.</p>}
      >
        {items.map((book) => (
          <div key={book.id} className="mb-3">
            <BookListItem book={book} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default BooksList;
