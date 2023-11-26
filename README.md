## Welcome to Bookworms!

<img width="78%" alt="home page" src="../portofolio-project-5/frontend/src/assets/testing/home_page_desktop.jpeg">

*Bookworms* is a platform designed for book enthusiasts—a space where users can search, rate, review, and discuss books. While currently focused on core features like discovering new reads, creating lists, and engaging in book-related discussions, Bookworms aims to evolve into a bustling community connecting authors and readers alike.

### [Live View](https://book-worms-761406c409e0.herokuapp.com/)

## CONTENTS

* [User Experience (UX)](#User-Experience-UX)
  * [Initial Project](#Initial-Project)
  * [User Stories](#User-Stories)
  * [Responsivity](#responsivity)
  * [User Friendly Messages](#user-friendly-messages)

* [Design](#Design)
  * [Color Scheme](#Color-Scheme)
  * [Typography](#Typography)
  * [Wireframes](#Wireframes)
  * [Features](#Features)

* [Technologies Used](#Technologies-Used)
  * [Languages Used](#Languages-Used)
  * [Frameworks, Libraries & Programs Used](#Frameworks-Libraries--Programs-Used)

* [Database Design](#Database-Design)
  * [Relationship Diagram](#Relationship-Diagram)
  * [Models](#Models)

* [Agile Development Process](#Agile-Development-Process)
  * [GitHub Projects](#GitHub-Projects)
  * [GitHub Issues](#GitHub-Issues)
  * [Moscow Prioritization](#Moscow-Prioritization)

* [Testing](#Testing)

* [Deployment & Development](#Deployment--Development)
    * [Deploy on Heroku](#Deploy-on-Heroku)
     * [Database Setup](#Database-Setup)
    * [Development](#Development)

* [ Credits](#Credits)
    * [Code](#Code)
    * [Media](#Media)
    * [Acknowledgements](#Acknowledgements)



## User-Experience-UX

### Initial-Project

Bookworms stemmed from a passionate vision to create a haven for book enthusiasts—a space that echoes the joy of diving into the world of literature. The initial spark ignited with the aspiration to develop a platform akin to Goodreads, fostering a community where readers could discover, discuss, and share their love for books.

The primary goal was to craft an intuitive and engaging platform that allows users to explore new reads, compile personal reading lists, and dive into book-centric discussions. While inspired by Goodreads, Bookworms began as a simplified version, focusing on core features like book exploration, reviews, and discussions.

Throughout the conceptualization phase, the aim was clear: to build a digital sanctuary for bibliophiles, providing a seamless experience for book discovery and interaction. As the project evolves, the intention is to expand and enrich the platform, incorporating features that amplify the reading experience and foster deeper connections between authors and readers.

Main Features:

- Search, rate, review, and discuss books.
- Discover new books and compile reading lists.
- Engage in book-centric discussions with fellow readers.
- Get personalized recommendations based on your reading preferences.

Mission Statement:
_"It doesn't take much to make a bookworm happy!"_ - Bookworms strives to be your go-to space for book exploration and discussion.

Join us as we grow into a thriving community for bibliophiles and readers to explore, discuss, and share their love for books.

# User-Stories

Some of the most important user stories are:

- As a guest I can sign in to the app to access functionality for logged-in users.

- As a guest or registered user, I can access a navigation bar from any page so that I can easily navigate between pages.

- As a guest or registered user, I can view the details of a single book so that I can learn more about the book's summary, author, and user reviews but also a comments section.

- As a guest or registered user, I can search for books with keywords to find books I'm most interested in.

- As a guest or registered user, I can view the details of a single book so that I can learn more about the book's summary, author, and user reviews but also a comments section.

- As a registered user, I can add a review to a book so that I can share my thoughts and feedback about the book with others.

- As a registered user, I can edit my book review so that I can make corrections or updates to my review.

- As a registered user, I can delete my own review of a book so that I can manage and remove my feedback when necessary.

All user stories as part of a project: https://github.com/users/Camelia03/projects/8



# Responsivity

Two primary device views have been considered to ensure responsiveness in Bookworms: mobile and larger monitor displays. While efforts have been made to enhance the application's mobile-friendliness, there's still room for improvement. Bootstrap5 features and custom CSS have been utilized as methods to achieve the desired level of device responsiveness.

<img width="78%" alt="responsivity" src="../portofolio-project-5/frontend/src/assets/am_i_responsive.jpg">


# User-friendly-messages
To ensure users feel confident about their actions and to offer clear guidance, the system generates user-friendly messages. These messages are crafted to provide reassurance, affirming the user's choices, while also offering helpful direction to navigate through the platform effectively. They serve as informative prompts, designed to support users by acknowledging their actions and steering them toward successful interactions within the system.

<img width="78%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/book_added_to_list_successfully.png">

<img width="78%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/book_removed_from_list_successfully.png">

<img width="38%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/signed_in_successfully.png">

<img width="38%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/review_added_successfuly.png">

<img width="38%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/review_edited_successfully.png">

<img width="38%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/review_deleted_successfully.png">

<img width="38%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/comment_added_successfully.png">

<img width="38%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/comment_edited_successfully.png">

<img width="38%" alt="friendly messages" src="../portofolio-project-5/frontend/src/assets/testing/comment_deleted_successfully.png">

## Design

### Color-Scheme
<img width="78%" alt="color palette" src="../portofolio-project-5/frontend/src/assets/bookworms_color_palette.png">

The color palette was created using the [Coolors](https://coolors.co/) website.

- #4a5d5e - serves as the primary color, offering a sophisticated and deep teal tone primarily applied to buttons, instilling a sense of modernity and elegance.
- #404e4f - is the hover state for primary-colored buttons, providing a slightly darker shade that adds depth and interactivity when users interact with these elements.
- #f8f8ec - functions as the secondary color, presenting a soft and inviting pale hue used for navigation, footer details, and other interface elements, creating a serene and approachable ambiance.
- #f1f1da - represents the hover state for secondary-colored buttons, offering a gentle shift in tone, maintaining the calming effect while subtly indicating interactivity.
- transparent (applied as _background-color: transparent;_) denotes clear elements, ensuring a minimalist and sleek appearance, with a color text of #334142 providing contrast and readability.
- #eaeac8 - signifies the active state for secondary-colored buttons, elevating the soft tone slightly to maintain visual interest without overwhelming the interface.

This color scheme combines a rich blend of hues to create a sophisticated and balanced palette. The primary color, represented by a deep, elegant shade of teal, exudes a sense of modernity and sophistication. Its complementary hover and active states offer a subtle shift, adding depth and interactivity without overpowering the primary tone.

In contrast, the secondary color employs a soft, pale hue reminiscent of light parchment. This color brings a calming and approachable feel to elements such as navigation bars and details within the interface. Its hover and active states gently elevate the tone, maintaining a serene ambiance.

Lastly, the clear elements maintain transparency while being highlighted by a dark charcoal text, ensuring clarity and readability. The absence of a defined background provides a sleek, minimalist touch to these particular interface elements.

![Bookworms Logo Color Pallete](/frontend/src/assets/logo_palette.png)
The logo was created using the [LOGO](https://app.logo.com/) website.
