import React from "react";
import BookListItem from "./BookListItem";
import { Col, Row } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import styles from "../styles/CompactBooksList.module.css";

/**
 * List books as a grid with images each with a tooltip of details
 */
const CompactBooksList = ({ books }) => {
  return (
    <Row className="gy-2 gx-2">
      {books.map((book) => (
        <Col xs="auto" key={book.id}>
          <Tippy
            theme="light"
            placement="right"
            interactive
            content={<BookTooltip book={book} />}
          >
            <div
              className={styles.BookImage}
              role="button"
              style={{ backgroundImage: `url('${book.image_url}')` }}
            />
            {/* <img  src={book.image_url} /> */}
          </Tippy>
        </Col>
      ))}
    </Row>
  );
};

const BookTooltip = ({ book }) => {
  return <BookListItem showImage={false} book={book} />;
};

export default CompactBooksList;
