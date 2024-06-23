# Contact Management Server for multiple Users using Nodejs, Expressjs & MongoDB

Welcome to the **Contact Management Server** documentation! This backend application is built using Node.js, Express.js, and MongoDB, providing a robust and scalable solution for managing contact information. It also manages users enrolled and their regular **CRUD** operations. This documentation is your comprehensive guide for interacting with the Contact Management Server.

## Features

- **User mangement:**

  - `Create Users:` Add new users with essential details such as name, email, username & password.
  - `Log IN/OUT Users:` Securely login and logout of the user session.
  - `Logged in User info:` Fetch details of logged in user account.
  - `Secure Authentication:` Access the user login session securely using JSON Web Tokens (JWT) for authentication.
  - `Secure Password Storage:` Passwords which are hashed using bcrypt & then stored in the database.

- **Contact management:**
  - `Create Contacts:` Add new contacts with essential details such as name, email, and phone number.
  - `Retrieve Contacts:` Fetch a list of all contacts or retrieve individual contacts by their unique identifiers.
  - `Update Contacts:` Modify existing contact information, ensuring accurate and up-to-date records.
  - `Delete Contacts:` Remove unwanted or outdated contacts from the system.
  - `Secure Authentication:` Access the API securely using JSON Web Tokens (JWT) for authentication.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Authentication](#user-authentication)
    - [User Registration](#user-registration)
    - [User Login](#user-login)
    - [LoggedIn User Fetch (secured route)](#loggedin-user-fetch-secured-route)
    - [User Logout](#user-logout-secured-route)
  - [Contact Management (Secured Routes)](#contact-management-secured-routes)
    - [Create a Contact](#create-a-contact)
    - [Get All Contact](#get-all-contacts-for-user)
    - [Get Contact by Number](#get-contact-details-by-number)
    - [Update Contact by Number](#update-contact-by-number)
    - [Delete Contact by Number](#delete-contact-by-number)
- [Error Handling](#error-handling)
- [Response Handling](#response-handling)
- [Running the Server](#running-the-server)

---

## Getting Started

### Prerequisites for Container via Docker
- [MongoDB server](#https://www.mongodb.com/)
- [Docker Setup](https://docs.docker.com/engine/install/)

### Installation 

```bash
docker run  -p 3000:<container-port> \
-e PORT=<container-port>t \
-e MONGODB_URI=<your-mongodb-compass-connection-string (without last '/')> \
-e ACCESS_TOKEN_SECRET=<your-access-token> \
-e ACCESS_TOKEN_EXPIRY=<your-access-token-duration (eg: 1 day -> 1d)> \
-e REFRESH_TOKEN_SECRET=<your-refresh-token> \
-e REFRESH_TOKEN_EXPIRY=<your-refresh-token-duration *must be greater than access token*(eg: 10 day -> 10d)> \
--name contact-management-backend \
syash7202/contact-management-backend
```

Specify you environment variables. This will start a container at port 3000 on you host machine.


### Prerequisites for manual installation

Before you start using the Contact Management Server, make sure you have the following installed:

- [Node.js](#https://nodejs.org/)
- [npm (Node Package Manager)](#https://www.npmjs.com/)
- [MongoDB server](#https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/syash7202/Contact-Management-Backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Contact-Management-Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=<server-port>
CORS_ORIGIN=*
MONGODB_URI=<your-mongodb-compass-connection-string (without last '/')>

ACCESS_TOKEN_SECRET=<your-access-token>
ACCESS_TOKEN_EXPIRY=<your-access-token-duration (eg: 1 day -> 1d)>
REFRESH_TOKEN_SECRET=<your-refresh-token>
REFRESH_TOKEN_EXPIRY=<your-refresh-token-duration *must be greater than access token*(eg: 10 day -> 10d)>
```

- Create a MongoDB cluster and attach MONGODB_URI

## API Endpoints

### User Authentication

#### User Registration:

**Endpoint**: `POST /user/register`

- **Request:**
  - `name`: User's full name
  - `email`: User's email address
  - `username`: User's username
  - `password`: User's password

```json
{
  "name": "Yash Sharma",
  "email": "workspacesyash7202@gmail.com",
  "username": "syash7202",
  "password": "admin1234"
}
```

- **Response:**
  - `statusCode`: exit code for request
  - `data`: relevant user data
  - `message`: relevant request message
  - `success`: boolean to check for successfull completion

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65a05ed89e0dd01c986504ff",
    "name": "Yash Sharma",
    "email": "workspacesyash7202@gmail.com",
    "username": "syash7202",
    "createdAt": "2024-01-11T21:34:16.904Z",
    "updatedAt": "2024-01-11T21:34:16.904Z",
    "__v": 0
  },
  "message": "User registered successfully !",
  "success": true
}
```

#### User Login:

**Endpoint**: `GET /user/login`

- **Request:**
  - `username`: User's username
  - `password`: User's password

```json
{
  "username": "syash7202",
  "password": "admin1234"
}
```

- **Response:**
  - `statusCode`: exit code for request
  - `data`: relevant user data
  - `message`: relevant request message
  - `success`: boolean to check for successful completion

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "65a05ed89e0dd01c986504ff",
      "name": "Yash Sharma",
      "email": "workspacesyash7202@gmail.com",
      "username": "syash7202",
      "createdAt": "2024-01-11T21:34:16.904Z",
      "updatedAt": "2024-01-11T21:35:50.483Z",
      "__v": 0
    }
  },
  "message": "User logged in Successfully !",
  "success": true
}
```

#### LoggedIn User Fetch (secured route):

**Endpoint**: `GET /user/info`

- **Request:**

  - Empty get request, authentication will be done using the access token in cookies.

- **Response:**
  - `statusCode`: exit code for request
  - `data`: relevant user data
  - `message`: relevant request message
  - `success`: boolean to check for successful completion

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65a05ed89e0dd01c986504ff",
    "name": "Yash Sharma",
    "email": "workspacesyash7202@gmail.com",
    "username": "syash7202",
    "createdAt": "2024-01-11T21:34:16.904Z",
    "updatedAt": "2024-01-11T21:35:50.483Z",
    "__v": 0
  },
  "message": "Current user fetched successfully !",
  "success": true
}
```

#### User Logout (secured route):

**Endpoint**: `GET /user/logout`

- **Request:**

  - Empty get request, authentication will be done using the access token in cookies.

- **Response:**
  - `statusCode`: exit code for request
  - `data`: relevant user data
  - `message`: relevant request message
  - `success`: boolean to check for successful completion

```json
{
  "statusCode": 200,
  "data": {},
  "message": "User logged out successfully !",
  "success": true
}
```

### Contact Management (Secured Routes)

#### Create a Contact:

**Endpoint**: `POST /contact/create-contact`

- **Request:**
  - `name`: contact's name
  - `email`: contact's email
  - `phone`: contact's phone number

```json
{
  "name": "Shreya Tyagi",
  "email": "shreyatyagi@gmail.com",
  "phone": 7777777777
}
```

- **Response:**
  - `statusCode`: exit code for request
  - `data`: relevant user data
  - `message`: relevant request message
  - `success`: boolean to check for successful completion

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65a05fc99e0dd01c9865050b",
    "user_id": "65a05ed89e0dd01c986504ff",
    "createdAt": "2024-01-11T21:38:17.929Z",
    "updatedAt": "2024-01-11T21:38:17.929Z",
    "__v": 0
  },
  "message": "Contact created successfully !",
  "success": true
}
```

#### Get All Contacts for User:

**Endpoint**: `GET /contact/get-contacts`

- **Request:**

  - Empty get request, authentication will be done using the access token in cookies.

- **Response:**
  - Array of contacts for the respective user

```json
[
  {
    "name": "Shreya Tyagi",
    "email": "shreyatyagi@gmail.com",
    "phone": 7777777777
  },
  {
    "name": "Carter Rapsody",
    "email": "rapsody@gmail.com",
    "phone": 9999999999
  }
  // other contacts
]
```

#### Get Contact details by Number:

**Endpoint**: `GET /contact/get-single-contact/`

- **Request:**
  - `phone`: contact's phone number

```json
{
  "phone": 9999999999
}
```

- **Response:**
  - `name`: contact's name
  - `email`: contact's email
  - `phone`: contact's phone
  - `user_id`: contact's owner id (reference)

```json
[
  {
    "name": "Carter Rapsody",
    "email": "rapsody@gmail.com",
    "phone": 9999999999,
    "user_id": "65a05ed89e0dd01c986504ff"
  }
]
```

#### Update Contact by Number:

**Endpoint**: `PUT /contact/update-contact`

- **Request:**
  - `oldPhone`: contact's old number
  - `newPhone`: contact's new number

```json
{
  "oldPhone": "1122334455",
  "newPhone": "6677889900"
}
```

- **Response:**
  - `statusCode`: exit code for resquest
  - `data`: relevant user data
  - `message`: relevant request message
  - `success`: boolean to check for successful completion

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65a060499e0dd01c98650512",
    "name": "Carter Rapsody",
    "email": "rapsody@gmail.com",
    "phone": 1111111111,
    "user_id": "65a05ed89e0dd01c986504ff",
    "updatedAt": "2024-01-11T21:42:11.162Z"
  },
  "message": "Phone number changed successfully !",
  "success": true
}
```

#### Delete Contact by Number:

**Endpoint**: `DELETE /contact/delete-contact`

- **Request:**
  - `phone`: contact's phone number

```json
{
  "phone": "1111111111"
}
```

- **Response:**
  - `statusCode`: exit code for request
  - `data`: relevant user data
  - `message`: relevant request message
  - `success`: boolean to check for successful completion

```json
{
  "statusCode": 200,
  "data": {
    "_id": "65a060499e0dd01c98650512",
    "name": "Carter Rapsody",
    "email": "rapsody@gmail.com",
    "phone": 1111111111,
    "user_id": "65a05ed89e0dd01c986504ff"
  },
  "message": "Number deleted successfully !",
  "success": true
}
```

## Error Handling

The server returns appropriate error responses for invalid requests or authentication issues with regard to a customized js configuration named `ApiError.js`.

- **501 Sever Error:**

  - Server error while computing with DB.

  ```json
  {
    "Error": "Something went wrong with the server !"
  }
  ```

- **400 Invalid data:**

  - Invalid or missing fields while creation, retrieval, update, or deletion.

  ```json
  {
    "Error": "Kindly provide required flieds"
  }
  ```

- **404 Not Found:**

  - Data not found.

  ```json
  {
    "Error": "Contact not found !"
  }
  ```

- **409 Bad Request:**

  - Data already exists.

  ```json
  {
    "Error": "Contact already exists !"
  }
  ```

## Response Handling

The server returns appropriate success responses for valid requests or authentications with regard to a customized js configuration named `ApiResponse.js`.

- **200 Success message:**

  -Request served successfully

  ```json
  {
    "statusCode":  statusCode < 400,
    "data": {},
    "message": "User created successfully !"
  }
  ```

## Running the Server

to install dependencies:

```bash
npm install
```

To start the server, run the following command:

```bash
npm run dev
```

The server will be running on the specified port, and you can make requests to the provided API endpoints.

- all the requests must be predicated with `/api/v1` to specify the API version; this can be changed in `app.js`.

Sample URLs :

```js
http://localhost:5000/api/v1/user/register

http://localhost:5000/api/v1/contact/create-contact
```

## Author

This application is developed & maintained by `Yash Sharma` with ❤. For inquiries or issues, reach me at workspacesyash7202@gmail.com.
