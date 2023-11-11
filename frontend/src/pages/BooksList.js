import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BookListItem from "../components/BookListItem";
import useReq from "../hooks/useReq";

const BooksList = ({ ordering, searchQuery }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const {
    data: books,
    loading,
    error,
  } = useReq(
    `/api/books/?title__icontains=${searchQuery}&ordering=${ordering}&page=${page}`
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
          <BookListItem key={book.id} book={book} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default BooksList;
