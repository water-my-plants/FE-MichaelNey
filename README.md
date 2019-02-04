# FE-MichaelNey

## Client Side Routes
* /login - Login View
* /register - Register View

## Environment File
The environment file is required to run this project. The reason is because we store our API URL inside of it, and it's used all over the client.

The environment file must be in the root directory of the project, outside of the /src directory. 

For the environment variable to be used in the project, you must have an assignment like this. Where the value is the link to the API that is being used. In our code, this can be used with the variable `process.env.REACT_APP_API`

`REACT_APP_API='http://localhost:5000/api'`
