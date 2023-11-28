# Testing

Return back to the [README.md](README.md) file.

## CONTENTS

* [AUTOMATED TESTING](#AUTOMATED-TESTING)
  * [ESLint Validator](#ESLint-Validator)
  * [Jigsaw Validator](#Jigsaw-Validator)
  * [Python Validator](#Python-Validator)

* [MANUAL TESTING](#MANUAL-TESTING)
  * [API Testing](#API-testing)
  * [Endpoints Testing](#Endpoints-testing)
  * [Testing User Stories](#Testing-User-Stories)
  * [MoSCoW prioritization](#Moscow-prioritization)
  * [Test cases](#Test-cases)

* [BUGS](#BUGS)



## AUTOMATED TESTING

### ESLint Validator

All JavaScript files were validated using the ESLint extension in VSCode and the built in integration of Create React App.

Issues found:
- Unused imports
- Unused variables

Prettier was used throughout development leading to very few eslint errors

### Jigsaw Validator
The [W3C Jigsaw CSS Validation Service](https://jigsaw.w3.org/css-validator/) was used to validate the CSS of the website.

- `src/AppModule.module.css` - no errors found
- `styles/AppButton.module.css` - no errors found
- `styles/CompactBookList.module.css` - no errors found
- `styles/HomePage.module.css` - no errors found
- `styles/MyListsPage.module.css` - no errors found
- `styles/NavBar.module.css` - no errors found
- `styles/NotificationContext.module.css` - no errors found
- `styles/ProfilePage.module.css` - no errors found
- `styles/ReviewListItem.module.css` - no errors found
- `styles/SearchForm.module.css` - no errors found


### Python Validator

I have used the recommended [CI Python Linter](https://pep8ci.herokuapp.com) to validate all of my Python files.

- `books/filters.py` - no errors found
- `books/models.py` - no errors found
- `books/paginations.py` - no errors found
- `books/serializers.py` - no errors found
- `books/urls.py` - no errors found
- `books/views.py` - no errors found

- `bookworms/permissions.py` - no errors found
- `bookworms/serializers.py` - no errors found
- `bookworms/settings.py` - no errors found
- `bookworms/urls.py` - no errors found

- `lists/apps.py` - no errors found
- `lists/filters.py` - no errors found
- `lists/models.py` - no errors found
- `lists/serializers.py` - no errors found
- `lists/urls.py` - no errors found
- `lists/views.py` - no errors found

- `profiles/apps.py` - no errors found
- `profiles/models.py` - no errors found
- `profiles/serializers.py` - no errors found
- `profiles/urls.py` - no errors found
- `profiles/views.py` - no errors found

- `reviews/apps.py` - no errors found
- `reviews/filters.py` - no errors found
- `reviews/models.py` - no errors found
- `reviews/serializers.py` - no errors found
- `reviews/urls.py` - no errors found
- `reviews/views.py` - no errors found

- - -

## MANUAL TESTING

### API Testing
 - Verified API Endpoints: Utilized Django Rest Framework UI to rigorously test and validate the functionality of API endpoints, ensuring seamless communication and accurate data exchange.

 - Request and Response Validation: Conducted comprehensive tests to confirm the correctness of request formats and validate the accuracy of responses received from the API endpoints.


#### Endoints Testing

| model     | endpoints                  |  description | response | testing | 
| --------- | -------------------------- | ------------ | -------- | ------- |
| book      | GET /api/books             | Get all books paginated. Filtering is available by title, genre, and a general search property which is one of title description or author. | ![](frontend/src/assets/testing/api/books_get.png) | Pass |
|           | GET /api/books/:id         | Returns one book | ![](frontend/src/assets/testing/api/books_get_one.png) | Pass |
| genre     | GET /api/genres            | Get all genres   | ![](frontend/src/assets/testing/api/genres_get.png) | Pass |
|           | GET /api/genres/:id/       | Get specific genre by name | ![](frontend/src/assets/testing/api/genres_get_one.png) | Pass |
| author    | GET /api/authors/:id/      | Get one author | ![](frontend/src/assets/testing/api/authors_get_one.png) | Pass |
|           | GET /api/authors/:id/books | Get the books of one author | ![](frontend/src/assets/testing/api/author_get_books.png) | Pass |
| review    | GET /api/books/:id/reviews | Get all reviews for a specific book | ![](frontend/src/assets/testing/api/book_get_reviews.png) | Pass |
|           | POST /api/books/:id/reviews | Create a review for a specific book | ![](frontend/src/assets/testing/api/book_post_review.png) | Pass |
|           | GET /api/reviews           |Get all reviews. Supports filtering by user.| ![](frontend/src/assets/testing/api/reviews_get.png) | Pass |
|           | POST /api/reviews/:id/like | Create a like for a review | ![](frontend/src/assets/testing/api/review_like.png) | Pass |
|           | GET /api/users/:id/reviews | Get all reviews for a user | ![](frontend/src/assets/testing/api/user_get_reviews.png) | Pass |
| like      | POST /api/likes            | Create a like | ![](frontend/src/assets/testing/api/like_post.png) | Pass |
|           | GET /api/likes/:id         | Get a like | ![](frontend/src/assets/testing/api/like_post.png) | Pass |
|           | DELETE /api/likes/:id      | Delete a like | ![](frontend/src/assets/testing/api/like_delete.png) | Pass |
| comment   | GET /api/comments          | List comments | ![](frontend/src/assets/testing/api/comments_get.png) | Pass |
|           | POST /api/comments         | Create a comment | ![](frontend/src/assets/testing/api/comments_post.png) | Pass |
|           | GET /api/comments/:id      | Get a comment | ![](frontend/src/assets/testing/api/comment_get_delete_put.png) | Pass |
|           | PUT /api/comments/:id      | Update a comment | ![](frontend/src/assets/testing/api/comment_get_delete_put.png) | Pass |
|           | PATCH /api/comments/:id    | Partial update a comment | ![](frontend/src/assets/testing/api/comment_get_delete_put.png) | Pass |
|           | DELETE/api/comments/:id    | Delete a comment | ![](frontend/src/assets/testing/api/comment_get_delete_put.png) | Pass |
|           | GET /api/reviews/:id/comments  | Get all comments for a review | ![](frontend/src/assets/testing/api/review_get_comments.png) | Pass |
| list      | GET /api/lists     |Get lists for the logged in user | ![](frontend/src/assets/testing/api/lists_get_post.png) | Pass |
|           | POST /api/lists    | Create lists for the logged in user | ![](frontend/src/assets/testing/api/lists_get_post.png) | Pass |
|           | GET /api/lists/:id      | Get a list | ![](frontend/src/assets/testing/api/list_get_delete.png) | Pass |
|           | PUT /api/lists/:id      | Update a list | ![](frontend/src/assets/testing/api/lists_put.png) | Pass |
|           | PATCH /api/lists/:id    | Partial update a list | ![](frontend/src/assets/testing/api/list_get_delete.png) | Pass |
|           | DELETE /api/lists/:id   | Delete a list | ![](frontend/src/assets/testing/api/list_get_delete.png) | Pass |
|           | POST /api/lists/:id/books/:id     | Add a book to a list | ![](frontend/src/assets/testing/api/lists_post_delete_book.png) | Pass |
|           | DELETE /api/lists/:id/books/:id     | Remove a book from a list | ![](frontend/src/assets/testing/api/lists_post_delete_book.png) | Pass |
| profile   | GET /api/profiles/:id            | Get a profile | ![](frontend/src/assets/testing/api/profile_get_put_.png) | Pass |
|           | PUT /api/profiles/:id            | Update a profile | ![](frontend/src/assets/testing/api/profile_get_put_.png) | Pass |
|           | PATCH /api/profiles/:id          | Partial update a profile | ![](frontend/src/assets/testing/api/profile_get_put_.png) | Pass |

- - -

### Testing User Stories

- User Stories Validation: Ensured each user story met its acceptance criteria by systematically testing and verifying functionality.

- Feature-based User Account Testing: Created a dedicated user account to methodically navigate and evaluate each platform feature individually, ensuring complete coverage and functionality across all aspects.

- Cross-Device and Browser Testing: Conducted thorough testing across multiple devices such as mobile phones, tablets, and various browsers like Chrome, Safari, Firefox, Microsoft Edge, ensuring a consistent and optimized user experience across different platforms and environments.

### MoSCoW prioritization

Listed below are **user stories** that I couldn't successfully implement, designated as "Won't Have" .

**Two user stories** have been marked as part of [Future Features](#Future-Features) and labeled as 'Won't Have' in my ***MoSCoW*** prioritization within the [project's GitHub repository](https://github.com/Camelia03/portofolio-project-5/issues). 

These stories are intentionally kept _open_ for potential implementation in future iterations but are categorized as features that won't be pursued in the current development phase.

![Future Features labeled as Won't Have](frontend/src/assets/testing/won't_have_user_stories.png)


### Test cases

Feature | Guest or Registered user | Expected Outcome | Testing Performed | Result | Pass/Fail |
| --- | --- | --- | --- | --- | --- |
| `Admin` |
| Admin link | Redirects to the admin panel | Click link | Redirected to the admin panel | Pass |
| `Navbar` | 
| **for guests** |
| Site logo | Redirects to the home page | Click logo |  Redirects to home page | Pass |
| Sign in Link | Redirect to Login page | Click log in link | Redirected to log in page | Pass |
| Sign up Link | Redirect to Sign up page | Click sign up link | Redirected to sign up page | Pass |
| **for logged in users** |
| Site logo | Redirects to the home page | Click logo |  Redirects to home page | Pass |
| Books Link | Redirects to All books page | Click link | Redirected to the All books page | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| User's dropdown menu| Shows the 3 options: My profile, My reviews, My lists and the Sign out button| Click button | Displayed the 3 options and the Sign out button | Pass |
| `Signin Page` | 
| **for registered users** |
| Form - Submission with no information | User prompted to fill in information | clicked submit button with no fields filled out | Form highlighted first empty field | Pass |
| Log in Button | Redirects to Home page after filling up the form corectly | Click button | Redirected to Home page | Pass |
| **for guests** |
| Form - Submission with no information | User prompted to fill in information | clicked submit button with no fields filled out | Form highlighted first empty field | Pass |
| Sign up Button | Redirects to Signin page after filling up the form corectly | Click button | Redirected to Signin page | Pass |
| `Home Page` | 
| View Books button | Redirects to the Books page | Click button | Redirected to the books page | Pass |
| Genres Link | Redirects to the selected genre's page | Click link | Redirected to the selected genre's page | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `My Profile Page` | 
| **for registered users** |
| My Profile Link | Redirects to the (logged in) user's profile page | Click link | Redirected to the user's profile page | Pass |
| Edit Profile button | Redirects to edit form for user's profile page | Click button | Redirected to the edit user's profile page | Pass |
| Change password button | Redirects to edit form for user's password page | Click button | Redirected to edit user's password page | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `Edit Profile Page` | 
| **for registered users** |
| Edit Profile Link | Redirects to the (logged in) user's Edit profile page | Click link | Redirected to the user's Edit profile page | Pass |
| Cancel button | Redirects to the (logged in) user's profile page  | Click button | Redirected to the (logged in) user's profile page | Pass |
| Save changes button | Submits the content wrote to edit user's profile | Click button | Profile is updated | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `My Reviews Page` | 
| **for registered users** |
| My Reviews Link | Redirects to the (logged in) user's reviews page | Click link | Redirected to the user's reviews page | Pass |
| Edit button | Redirects to the (logged in) user's existing review form to edit page | Click button | Redirected to the user's existing review form page | Pass |
| Delete button | Modal popup to delete review | Click button | Review is deleted | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `Edit My Reviews Page` | 
| **for registered users** |
| Edit My Reviews Link | Redirects to the (logged in) user's review page | Click link | Redirected to the user's review page | Pass |
| Stars button | User is able to select how many stars would give as a rating to a book | Click button | A selected number of stars are filled up when clicked | Pass |
| Cancel button | Redirects to the (logged in) user's My Reviews page  | Click button | Redirected to the (logged in) user's user's My Reviews page | Pass |
| Save changes button | Submits the content wrote to edit user's review | Click button | Review is updated | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `My Lists Page` | 
| **for registered users** |
| My Lists Link | Redirects to the (logged in) user's lists page | Click link | Redirected to the user's lists page | Pass |
| Book's title Link | Redirects to the Book's details page | Click link | Redirected to the Book's details page | Pass |
| Authors Link | Redirects to the selected Author page | Click link | Redirected to the selected Author page | Pass |
| Remove from list Button  | Removes the selected book from the selected list| Click link | Removed the selected book from the selected list | Pass |
| My Lists Dropdown menu | User prompted to select a list option | Click button | Displayed the books added to the selected list option | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `My Lists Dropdown menu` | 
| **for registered users** |
| User prompted to select a list option | Click button | Displayed the books added to the selected list option | Pass |
| Edit button | Redirects to the (logged in) user's selected Edit list page | Click button | Redirected to edit the selected list page | Pass |
| Delete button | Modal popup to delete reply | Click button | Reply is deleted | Pass |
| `Edit List Page` | 
|**for registered users** |
| Edit List Link | Redirects to edit the (logged in) user's selected list page | Click link | Redirected to the Edit list page | Pass |
| Save changes button | Submits the content wrote to edit user's list | Click button | List is updated | Pass |
| Cancel button | Redirects to the (logged in) user's Lists page  | Click button | Redirected to the (logged in) user's Lists page | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `All books Page` |
| Books Link | Redirects to All books page | Click link | Redirected to the All books page | Pass |
| Order by dropdown button | User prompted to select an option | Click button | Redirected to the All Books page with ordered books | Pass |
| `Book details Page`| 
| **for registered users** |
| A Book details Link | Redirects to the (selected) book page | Click link | Redirected to (selected) book page | Pass |
| Add to List button | Redirects to the Add to a certain list modal | Click button | Redirected to the Add to a certain list modal | Pass |
| Add a review button | Redirects to the Add a review page | Click link | Redirected to the Add a review page | Pass |
| **for guests** |
| A Book details Link | Redirects to the (selected) book page | Click link | Redirected to (selected) book page | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| Sign in button | Redirect to Sign page | Click button | Redirected to log in page | Pass |
| Sign up button | Redirect to Sign up page | Click button | Redirected to log in page | Pass |
| Books Link | Redirects to All books page | Click link | Redirected to the All books page | Pass |
| Site logo | Redirects to the home page | Click logo |  Redirects to home page | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `Add a Review Page`| 
| **for registered users** |
| Add a Review Link | Redirects to the Add a review page | Click link | Redirected to Add a review page | Pass |
| Stars button | User is able to select how many stars would give as a rating to a book | Click button | A selected number of stars are filled up when clicked | Pass |
| Cancel button | Redirects to the Book details page | Click button | Redirected to the Book details page | Pass |
| Post review button | Submits the content wrote to add a review to the selected book | Click button | Submitted to add a review to the selected book | Pass |
| `Add to List button` | 
| **for registered users** |
| Add to list button | A modal displays all the lists and the option to add a book to a list or more lits or remove if already added | Click button | Displayed all the lists a book can be added or removed | Pass |
| + button | Adds a book to a certain list | Click button | Added a book to a certain list | Pass |
|- button | Removes a book from a certain list if already added | Click button | Removed a book from a certain list if already added | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `Genres Page` |
| A genre Link | Redirects to the (selected) genre page | Click link | Redirected to (selected) genre page | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |
| `Like button` | 
| **for registered users** |
| Like button | Increases the number of likes | Click button | Increased the number of likes | Pass |
| `Unlike button` | 
| **for registered users** |
| Like button | Decreases the number of likes | Click button | Decreased the number of likes | Pass |
| `Comments button` | 
| **for registered users** |
| Submit button | Submits the content wrote as a comment | Click button | Submitted the content wrote as a comment | Pass |
| Edit button | Redirects to edit your comment modal | Click button | Redirected to the edit your comment modal | Pass |
| Delete button | Modal popup to delete reply | Click button | Reply is deleted | Pass |
| `Other user's Profile Page` | 
| **for registered users** |
| Other user's Profile Link | Redirects to the (selected) user's profile page | Click button | Redirected to the (selected) user's profile page | Pass |
| Search button | User prompted to fill in a keyword | Click button | Redirected to the results page | Pass |


## Bugs

- When implementing infinite scroll for Books, the pagination returned the same book on different pages.    
_Fix:_ Adding an extra order by title when listing Books
- The infinite scroll component was flickering and showing a scroll bar.
_Fix:_ The issue was caused by the react-bootstrap spinner. Instead of the spinner, a simple text was used: “Loading:”
- There are 3 genres that have no books attached due to importing only half the number of books.    
_Fix:_ Remove the empty genres
- The cancel button within a form would also submit the form when going back.   
_Fix:_ Add `type="button"` to the `button`
- The change password page was not shown. Instead, the profile page was shown.  
_Fix:_ Move the change password route (`/profile/change-password`) above the profile route (`/profile/:id`) so that the first one is rendered

- - -

Back to [README.md](README.md)