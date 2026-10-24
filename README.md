# Node.js MVC MongoDB CRUD

A REST API for managing users, built with Node.js, Express, and MongoDB using an MVC-style structure.

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB connection URI

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and set `MONGODB_URI` if your MongoDB connection differs from the local default.

3. Start the API:

   ```sh
   npm run dev
   ```

   Or use `npm start` for a regular start.

The server listens on port `3000` by default. Set `PORT` in `.env` to change it.

## User endpoints

Base URL: `http://localhost:3000/api/users`

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/` | Create a user |
| `GET` | `/` | List users |
| `GET` | `/:id` | Get a user |
| `POST` | `/:id` | Update a user |
| `GET` | `/:id/delete` | Delete a user |

Example create request:

```json
{
  "name": "Alex Morgan",
  "email": "alex@example.com",
  "age": 30
}
```

`name` and `email` are required; `email` must be unique. `age` is optional and must be a non-negative number. Successful responses return the resource in a `data` property; errors return an `error` property and may include validation `details`.

## Project structure

```text
src/
  config/       MongoDB connection
  controllers/  CRUD request handlers
  middleware/   Error handling
  models/       Mongoose schemas
  routes/       API routes
  utils/        Shared helpers
  app.js        Express application
  server.js     Application startup
```
