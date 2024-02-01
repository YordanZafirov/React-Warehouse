import { Link } from "react-router-dom";
import { NotFoundContainer } from "./NotFound.style";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>Page not found!</h1>
      <p>Sorry, but the page you were trying to view does not exist.</p>
      <Link to="/">Go Home</Link>
    </NotFoundContainer>
  );
};

export default NotFound;
