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

## Image endpoints

Images are stored as binary data in MongoDB's `Image` collection. Upload a JPEG, PNG, GIF, or WebP image of up to 5 MB:

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/image` | Upload an image file or Base64 image |
| `GET` | `/image/:id` | Retrieve an uploaded image |

### Upload a selected file in Postman

1. Select **POST** and enter `http://localhost:3000/image`.
2. Open **Body** and choose **form-data**.
3. Add a row with key `image`, change its type from **Text** to **File**, and select your image.
4. Send the request. Let Postman set the multipart `Content-Type` header automatically.

The API stores the selected image's binary data directly in MongoDB; it does not need a Base64 conversion for file uploads.

### Upload Base64 JSON

Alternatively, send a Base64 data URL:

```json
{
  "image": "data:image/png;base64,<base64-data>"
}
```

Or provide the Base64 value and content type separately:

```json
{
  "contentType": "image/png",
  "image": "<base64-data>"
}
```

The upload response includes the image ID and retrieval URL. The API checks that the decoded bytes match the declared image type.

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
