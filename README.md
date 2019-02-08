# Water My Plants - React Application Front End
https://water-my-plants-client.herokuapp.com/ 

## How To Run Locally

* Git Clone https://github.com/water-my-plants/FE-MichaelNey.git
* Run `yarn` in the directory of the cloned repository.
* Add `.env` file with the appropriate API address you are using in the root directory. (See Environment File Section of Readme)
* Run `yarn start` to run the React Application.

## Client Side Routes
* /login - Login View.
* /register - Register View.
* /logout - Logout functionality.
* /profile - Profile view, also for editing profile.
* / - Home/Plants View.
* /plants - Home/Plants View.
* /plants/add - PlantForm for adding a plant.
* /plants/:id - A single page for a plant, where id in parameters is the id of the plant. You can edit the plant, add a schedule, or delete the schedule/single schedules here.

## Environment File
The environment file is required to run this project. The reason is because we store our API URL inside of it, and it's used all over the client for HTTP request with the Axios library.

The environment file must be in the root directory of the project, outside of the /src directory. 

For the environment variable to be used in the project, you must have an assignment like this. Where the value is the link to the API that is being used. In our code, this can be used with the variable `process.env.REACT_APP_API`

`REACT_APP_API='http://localhost:5000/api'`

## Technologies Used in Project
* [React](https://reactjs.org/)
* [React-Router](https://github.com/ReactTraining/react-router#readme)
* [Axios](https://github.com/axios/axios)
* [Redux](https://redux.js.org/)
* [React-Redux](https://react-redux.js.org/)
* [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
* [Notistack](https://iamhosseindhv.com/notistack)
* [Moment](https://momentjs.com/)
* [prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html)
* [react-overlays](https://yarnpkg.com/en/package/react-overlays)
* [react-paginate](https://yarnpkg.com/en/package/react-paginate)
* [styled-components](https://www.styled-components.com/)
* [Material UI](https://material-ui.com/)

