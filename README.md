# Notes App

This project aims to build a secure and scalable RESTful API for managing notes. Users can perform CRUD operations on notes, share notes with others, and search notes based on keywords.

## API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account and receive an access token.

### Note Endpoints

- `GET /api/notes`: Get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID for the authenticated user.
- `POST /api/notes`: Create a new note for the authenticated user.
- `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.
- `GET /api/search?q=:query:`: Search for notes based on keywords for the authenticated user.

## Technologies Used

- Framework: node.js, Express
- Database: MongoDB,Mongoose
- Authentication: JWT
- Testing Framework: Mocha, Chai

## Installation and Setup

### Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) installed.
- Make sure you have [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed.

1. Clone the repository:

```bash
git clone https://github.com/sejal-vaghasia/NotesApp.git
```

2. Navigate to the project directory:
```bash
cd NotesApp
```

3. Install all the dependencies:
```bash
npm install 
```

4. Run database seeder(Default password for all seeding users are 123456789):
```bash
npm run seed 
```

## Usage

1. Run the project:
```bash
npm start
```

2. You may import the Postman collection and postman environment file to run the API:
- [Postman Collection](https://github.com/sejal-vaghasia/NotesApp/blob/e2002549b990f137f50be04d06c282c48d4b65dc/NotesApp.postman_collection.json) 
- [Postman Environment](https://github.com/sejal-vaghasia/NotesApp/blob/e2002549b990f137f50be04d06c282c48d4b65dc/notesApp.postman_environment.json)
