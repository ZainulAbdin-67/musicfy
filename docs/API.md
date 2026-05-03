# Musicfy API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** `{ token, user }`

#### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** `{ token, user }`

### Songs

#### Get All Songs
- **GET** `/songs?search=query&genre=genre&limit=20&skip=0`
- **Query Parameters:**
  - `search` - Search by title, artist, album
  - `genre` - Filter by genre
  - `limit` - Limit results (default: 20)
  - `skip` - Pagination offset (default: 0)
- **Response:** `{ songs, total, hasMore }`

#### Get Song by ID
- **GET** `/songs/:id`
- **Response:** Song object

#### Create Song (Authenticated)
- **POST** `/songs`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "title": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "genre": "Pop",
    "duration": 180,
    "url": "https://example.com/song.mp3"
  }
  ```
- **Response:** Song object

#### Increment Play Count
- **PUT** `/songs/:id/play`
- **Response:** Updated song object

### Playlists

#### Get User's Playlists (Authenticated)
- **GET** `/playlists`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Array of playlist objects

#### Get Playlist by ID
- **GET** `/playlists/:id`
- **Response:** Playlist object with songs

#### Create Playlist (Authenticated)
- **POST** `/playlists`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Playlist Name",
    "description": "Optional description"
  }
  ```
- **Response:** Created playlist object

#### Add Song to Playlist (Authenticated)
- **PUT** `/playlists/:id/add-song`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "songId": "songid123"
  }
  ```
- **Response:** Updated playlist object

#### Remove Song from Playlist (Authenticated)
- **PUT** `/playlists/:id/remove-song`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "songId": "songid123"
  }
  ```
- **Response:** Updated playlist object

### Users

#### Get Current User (Authenticated)
- **GET** `/users/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** User object with favorites and history

#### Get User by ID
- **GET** `/users/:id`
- **Response:** User object

#### Add Song to Favorites (Authenticated)
- **PUT** `/users/favorites/add`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "songId": "songid123"
  }
  ```
- **Response:** Updated user object
