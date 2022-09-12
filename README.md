<!-- # Small

[Live Demo][heroku]

[heroku]: https://small-project.herokuapp.com/

Small is a blogging website for the little things in life, inspired by Medium. It makes use of a Rails/PostgreSQL backend with React.js and Redux on the frontend.

The project was designed and built within a two-week timeframe, though I plan to continue adding improvements over time.

## Features
  * Secure frontend to backend user authentication using BCrypt.
  * Users can create and edit stories using a Quill-enabled rich text editor.
  * Feed dynamically adapts to display all published stories in an appealing way.
  * Users can comment on posts and edit their responses directly on the page.
  * Users can like posts and follow other users.
  * Stories support images and animated GIFs.

### Adaptive Feed

The feed updates to display all stories that have been posted to the site. The size of each story tile adapts to display each row in the most appealing way possible, preventing hanging tiles or tiles that occupy a row by themselves. Many combinations are possible, including two rows of two, one row of two and another of three, and two of threes, among others.

![Small feed](docs/images/feed.png)

This was accomplished by breaking the feed into grouped row components, each with differing layouts, and selecting the optimal one based on the number of remaining stories, like so:

```jsx
  // If we only have 4 stories left, prioritize starting with a
  // group of two so we don't have hanging tiles, otherwise,
  // push a group of three by default
  switch(idx) {
    case (this.props.stories.length - 4):
      feedRows.push(
        <GroupOfTwo
          key={this.props.stories[idx].id}
          stories={this.props.stories.slice(idx, idx+2)} />
      )
      idx += 2;
      break;
    default:
      feedRows.push(
        <GroupOfThree
          key={this.props.stories[idx].id}
          stories={this.props.stories.slice(idx, idx+3)} />
      )
      idx += 3;
  }
```

Though a variety of potential approaches exist to this problem, this one stood out to me as both the simplest and most-readable solution, which translates to a cleaner and more maintainable codebase.

### Story editing and conditional rendering

Users can add stories with a minimum of the title and body. There is an optional description element as well as support for image uploading. Each story's show page contains additional information about the author as well as the date it was published.

The story creation and editing page is modest at first glance:

![Small story editing page](docs/images/story_edit_new.png)

To keep code DRY, similar components were combined into a singular, more adaptable component to avoid rendering multiple copies of what was essentially the same html in different classes. This was done for the story creation and update pages as well as the login and signup dialogs. While this increases the complexity of the classes somewhat, it pays off in the newfound ease of switching form types:

```js
  setForm(formType) {
    return () => {
      this.setState({ formType }, () => {
        this.props.resetErrors();
        this.focusFirstElement();
      });
    };
  }
```

Similarly, for the login form, a single modal component can be used for all session-related tasks:

```jsx
  <span className="write-story"
    onClick={this.openModal('login')}>Write a story</span>
  <span className="link"
    onClick={this.openModal('login')}>Login</span>
  &nbsp;
  <span className="link"
    onClick={this.openModal('signup')}>Sign Up</span>
  <Modal
    className="modal"
    overlayClassName="modal-overlay"
    isOpen={this.state.modalIsOpen}
    onRequestClose={this.closeModal}
    contentLabel="Login Modal">
    <LoginModalContainer
      formType={this.formType} />
  </Modal>
```

And when errors inevitably appear, debugging only needs to happen in one central location as opposed to several related classes. In addition, styling only needs to happen on one component and the site as a whole is lent a better sense of coherence as a result.

### Creating and updating comments

![Small comment creation demo](docs/images/adding_comment.gif)

Comments are added to the story page dynamically using React and Redux's render and subscription features, respectively. Because of this, changes in state are reflected immediately upon request completion, without any need for additional DOM manipulation.

In addition, editing comments occurs "directly" in the comment thread, with updates occurring immediately after submit. The `<textarea>` element adapts its size dynamically to fit the contents of the container.

![Small comment update demo](docs/images/editing_comment.gif)

This was accomplished through a hidden `<form>` element that is conditionally rendered with an `autofocus` property. The autofocus property triggers an `onfocus` event that acts as a pseudo-initialization for the element, which then begins to update in real-time:

```jsx
<textarea
  className="editForm"
  onChange={this.update("body")}
  autoFocus
  onFocus={this.autoSize}
  value={this.state.body}
/>
```

## Project Design

Small was designed with simplicity and elegance as its primary goals. Considering the two-week time period, it was decided to focus on a core set of features that ran smoothly and bug-free. Keeping code manageable was prioritized over cloning every major feature of the target app, in the interest of providing a solid codebase to build upon for the future.

## Technologies

Rails was chosen due to its out-of-the-box support for relational databases and RESTful architecture. As this project was a smaller-scale portfolio piece being built in a relatively short timeframe, convenience and speed was prioritized over scalability. For this reason, the chosen technologies (Heroku, Rails, etc.) were determined to be adequate for the predicted load.

Frontend Redux states are set up in a way such that there are separate reducers and actions for stories, comments, likes, follows, users, and errors. This keeps the state normalized, easing the task of keeping things up-to-date with changes in the database.

In addition to the included packages, [Cloudinary][cloudinary] was used for image uploading.

[cloudinary]: https://cloudinary.com/

### Additional Resources
  * [Proposal Wireframes][wireframes]
  * [API Endpoints][apiEndPoints]
  * [Database Schema][dbSchema]

[wireframes]: https://github.com/s-pangburn/small/wiki/Wireframes
[apiEndPoints]: https://github.com/s-pangburn/small/wiki/Routes
[dbSchema]: https://github.com/s-pangburn/small/wiki/Schema

## Possible future features

In the future I would like to add:
  * User pages/avatars
  * Search -->

# AirBnB Clone

Heroku Link: http://kb-airbnb.herokuapp.com/

GitHub Link: https://github.com/irelius/AirBnB

## Setup Directions:
1. Clone from GitHub repository and run `npm install` in both the frontend and backend directories.
2. Create a ".env" file in the "backend" directory using the ".env.example" as a guide
3. In the "backend" directory, run the migration and seeder files using the following commands:
    1. "npx dotenv sequelize db:migrate"
    2. "npx dotenv sequelize db:seed:all"
4. Run "npm start" in both the "frontend" and "backend" directories

___

## Description:
This repo is an Airbnb clone implementing two CRUD features of Airbnb, Spots and Reviews. It also implements features to allow users to sign up and account or log into their account.


___

## Landing Page:
The landing page is the AirBnB front page that lists existing spots from the existing seeder file. After a user logs in and creates a spot, the newly created spot will be generated on the landing page at the end.

![Landing Page](https://github.com/irelius/AirBnB/blob/main/assets/schema/airbnblandingpage.png)

## Create a Spots:
After a user logs in, they will be able to create a new spot with the "Become a Host" button. That will lead them to a page with a form to fill out information about the location they wish to "host".

![Spot Page](https://github.com/irelius/AirBnB/blob/main/assets/schema/airbnbspotpage.png)


## Manage Spots:
If a user has created a spot(s), they can manage them under their "Manage Your Listings" option. There the user can edit and delete their spots.

![Manage Spot Page](https://github.com/irelius/AirBnB/blob/main/assets/schema/airbnbmanagelistings.png)


## Spot Detail's Page:
Clicking on a spot on the main landing page will lead a user to the spot's respective details page. It will list the spot's details and preview image at the top with a section for reviews at the bottom.

![Spot Detail Page](https://github.com/irelius/AirBnB/blob/main/assets/schema/airbnbspotdetail.png)


## Reviews Section:
Within the reviews section of a spot detail's page there will be reviews loaded from the seeder file to function as example reviews. Depending on whether a user is logged in or not, there will be section to submit/delete a review or to log in.


---

## Technologies Used:
This AirBnB clone utilizes React and Redux to manage reducers, actions, and the store to reduce the amount of times the webpage must be refreshed, reducing the amount of time the website may take to load information.

---

## Future Features:
The Reviews CRUD feature currently does not implement the ability to edit a user's review for a spot.
Implement a function to allow users to upload a photo file to use as a spot's cover photo.
Implement a function to allow users to enter an address to extract location details such as longitude and latitude, instead of having users enter it themselves.
