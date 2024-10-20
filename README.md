# SIMPLE CRUD API

**Implementation** of a simple CRUD API using in-memory db (save data as a local variable)

### for correct working with app use 22.9.0 version of Node.js (look at the .nvmrc file)

for checking version use

```javascript
node - v;
```

1. _install dependencies_

- in terminal use the next command: **npm install**

2. _connect env params_

- _Please_, for correct working with the App **rename file .env.txt to the .env**
  By default server is listen on **8080 port**

3. _run application_

- `just build app` in terminal use the next command: **npm run build**

- `dev mode` in terminal use the next command: **npm run start:dev**

- `prod mode` in terminal use the next command: **npm run start:prod**

_production mode (prod)_ built the app and ran server immediately under the hood.

4. _run test cases_

- in terminal use the next command: **npm run test**
  test was written

### Implementation

Endpoints:

- GET - <http://localhost:3000/api/users> - to get all saved users
- GET - <http://localhost:3000/api/users/{:id}> - to get user by ID
- POST - <http://localhost:3000/api/users> - to create new user in database

- PUT - <http://localhost:3000/api/users/{:id}> - to update user by ID

- DELETE - <http://localhost:3000/api/users/{:id}> - to update user by ID

**Please**, be sure, that for _POST_ and _PUT_ queries you provided body in format application/json inside Postman - or other tools you chose.

## Implementation details

1. Implemented endpoint `api/users`:
   - **GET** `api/users` is used to get all persons
     - Server should answer with `status code` **200** and all users records
   - **GET** `api/users/{userId}`
     - Server should answer with `status code` **200** and record with `id === userId` if it exists
     - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
   - **POST** `api/users` is used to create record about new user and store it in database
     - Server should answer with `status code` **201** and newly created record
     - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
   - **PUT** `api/users/{userId}` is used to update existing user
     - Server should answer with`status code` **200** and updated record
     - Server should answer with`status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server should answer with`status code` **404** and corresponding message if record with `id === userId` doesn't exist
   - **DELETE** `api/users/{userId}` is used to delete existing user from database
     - Server should answer with `status code` **204** if the record is found and deleted
     - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
     - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
2. Users are stored as `objects` that have following properties:
   - `id` — unique identifier (`string`, `uuid`) generated on server side
   - `username` — user's name (`string`, **required**)
   - `age` — user's age (`number`, **required**)
   - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) should be handled (server should answer with `status code` **404** and corresponding human-friendly message)
4. Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with `status code` **500** and corresponding human-friendly message)
5. Value of `port` on which application is running should be stored in `.env` file
6. There should be 2 modes of running application (**development** and **production**):

   - The application is run in development mode using `nodemon` or `ts-node-dev` (there is a `npm` script `start:dev`)
   - The application is run in production mode (there is a `npm` script `start:prod` that starts the build process and then runs the bundled file)

7. Users are stored as objects that have following properties:

- `id` — unique identifier (string, `uuid`) generated on server side
- `username` — user's name (string, required)
- `age` — user's age (number, required)
- `hobbies` — user's hobbies (array of strings or empty array, required)

8. Requests to non-existing endpoints (e.g. some-non/existing/resource) should be handled (server should answer with `status code`
   **404** and corresponding human-friendly message)
9. Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with `status code`
   **500** and corresponding human-friendly message)
