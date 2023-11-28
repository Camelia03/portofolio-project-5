import { Route, Switch, useHistory } from "react-router-dom";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import AuthorPage from "./pages/book/AuthorPage";
import BookDetailsPage from "./pages/book/BookDetailsPage";
import CreateListPage from "./pages/list/CreateListPage";
import CreateReviewPage from "./pages/review/CreateReviewPage";
import EditListPage from "./pages/list/EditListPage";
import EditReviewPage from "./pages/review/EditReviewPage";
import GenreDetailPage from "./pages/book/GenreDetailPage";
import HomePage from "./pages/HomePage";
import MyListsPage from "./pages/list/MyListsPage";
import MyReviewsPage from "./pages/review/MyReviewsPage";
import SearchPage from "./pages/book/SearchPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import ProfilePage from "./pages/profile/ProfilePage";
import ChangePasswordPage from "./pages/profile/ChangePasswordPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <NavBar />

      <div className={`${styles.Main} pt-0 pt-md-5 pb-5`}>
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/search" render={() => <SearchPage />} />
          <Route exact path="/signin" render={() => <SignInPage />} />
          <Route exact path="/signup" render={() => <SignUpPage />} />
          <Route
            exact
            path="/profile"
            render={() => (
              <MemberPage>
                <ProfilePage />
              </MemberPage>
            )}
          />
          <Route
            exact
            path="/profile/edit"
            render={() => (
              <MemberPage>
                <EditProfilePage />
              </MemberPage>
            )}
          />

          <Route
            exact
            path="/profile/change-password"
            render={() => (
              <MemberPage>
                <ChangePasswordPage />
              </MemberPage>
            )}
          />

          <Route exact path="/profile/:id" render={() => <ProfilePage />} />

          <Route exact path="/books/:id" render={() => <BookDetailsPage />} />
          <Route
            exact
            path="/books/:id/review"
            render={() => (
              <MemberPage>
                <CreateReviewPage />
              </MemberPage>
            )}
          />
          <Route
            exact
            path="/reviews/:id"
            render={() => (
              <MemberPage>
                <EditReviewPage />
              </MemberPage>
            )}
          />
          <Route
            exact
            path="/genres/:name"
            render={() => <GenreDetailPage />}
          />
          <Route
            exact
            path="/my-reviews"
            render={() => (
              <MemberPage>
                <MyReviewsPage />
              </MemberPage>
            )}
          />
          <Route
            exact
            path="/my-lists"
            render={() => (
              <MemberPage>
                <MyListsPage />
              </MemberPage>
            )}
          />
          <Route
            exact
            path="/my-lists/create"
            render={() => (
              <MemberPage>
                <CreateListPage />
              </MemberPage>
            )}
          />
          <Route
            exact
            path="/my-lists/:id/edit"
            render={() => (
              <MemberPage>
                <EditListPage />
              </MemberPage>
            )}
          />

          <Route exact path="/authors/:id" render={() => <AuthorPage />} />

          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

const MemberPage = ({ children }) => {
  const currentUser = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/signin");
    }
  }, []);

  if (!currentUser) return null;

  return children;
};
