import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import BookDetailsPage from "./pages/BookDetailsPage";
import GenreDetailPage from "./pages/GenreDetailPage";
import CreateReviewPage from "./pages/CreateReviewPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/signin" render={() => <SignInPage />} />
          <Route exact path="/signup" render={() => <SignUpPage />} />
          <Route exact path="/profile" render={() => <ProfilePage />} />
          <Route exact path="/books/:id" render={() => <BookDetailsPage />} />
          <Route
            exact
            path="/books/:id/review"
            render={() => <CreateReviewPage />}
          />

          <Route
            exact
            path="/genres/:name"
            render={() => <GenreDetailPage />}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
