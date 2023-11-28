import { NavLink } from "react-router-dom";

const AuthorsList = ({ authors }) => {
  return (
    <span>
      {authors.map((author, idx) => (
        <span key={author.id}>
          <NavLink to={`/authors/${author.id}`}>{author.full_name}</NavLink>

          {idx + 1 != authors.length && <span className="me-1">,</span>}
        </span>
      ))}
    </span>
  );
};

export default AuthorsList;
