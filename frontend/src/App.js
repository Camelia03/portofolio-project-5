import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/profile/ProfilePage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import BookDetailsPage from "./pages/BookDetailsPage";
import GenreDetailPage from "./pages/GenreDetailPage";
import CreateReviewPage from "./pages/CreateReviewPage";
import EditReviewPage from "./pages/EditReviewPage";
import MyReviewsPage from "./pages/MyReviewsPage";
import MyListsPage from "./pages/MyListsPage";
import CreateListPage from "./pages/CreateListPage";
import EditListPage from "./pages/EditListPage";
import HomePage from "./pages/HomePage";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import AuthorPage from "./pages/AuthorPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className={`${styles.Main} pt-5 pb-5`}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/search" render={() => <SearchPage />} />
          <Route exact path="/signin" render={() => <SignInPage />} />
          <Route exact path="/signup" render={() => <SignUpPage />} />
          <Route exact path="/profile" render={() => <ProfilePage />} />
          <Route exact path="/profile/:id" render={() => <ProfilePage />} />
          <Route exact path="/books/:id" render={() => <BookDetailsPage />} />
          <Route
            exact
            path="/books/:id/review"
            render={() => <CreateReviewPage />}
          />
          <Route exact path="/reviews/:id" render={() => <EditReviewPage />} />
          <Route
            exact
            path="/genres/:name"
            render={() => <GenreDetailPage />}
          />
          <Route exact path="/my-reviews" render={() => <MyReviewsPage />} />
          <Route exact path="/my-lists" render={() => <MyListsPage />} />
          <Route
            exact
            path="/my-lists/create"
            render={() => <CreateListPage />}
          />
          <Route
            exact
            path="/my-lists/:id/edit"
            render={() => <EditListPage />}
          />

          <Route exact path="/authors/:id" render={() => <AuthorPage />} />

          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
