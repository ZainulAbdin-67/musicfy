# Musicfy Database Schema

## User Schema

```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (required, hashed),
  profileImage: String,
  bio: String,
  favorites: [ObjectId(Song)],
  listenHistory: [
    {
      songId: ObjectId(Song),
      listenedAt: Date
    }
  ],
  followers: [ObjectId(User)],
  following: [ObjectId(User)],
  createdAt: Date
}
```

## Song Schema

```javascript
{
  _id: ObjectId,
  title: String (required),
  artist: String (required),
  album: String,
  genre: String,
  duration: Number (required),
  url: String (required),
  coverImage: String,
  playCount: Number,
  uploadedBy: ObjectId(User),
  createdAt: Date
}
```

## Playlist Schema

```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  owner: ObjectId(User) (required),
  songs: [ObjectId(Song)],
  coverImage: String,
  isPublic: Boolean,
  followers: [ObjectId(User)],
  createdAt: Date,
  updatedAt: Date
}
```

## Relationships

- **User** -> **Song**: One-to-Many (User uploads Songs)
- **User** -> **Playlist**: One-to-Many (User owns Playlists)
- **User** -> **User**: Many-to-Many (Followers/Following)
- **Playlist** -> **Song**: Many-to-Many (Playlist contains Songs)
- **User** -> **Song**: Many-to-Many (User likes Songs)
