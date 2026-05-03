# Musicfy - Music Streaming Platform 🎵

A modern, feature-rich music streaming platform inspired by Spotify built with React, Node.js, and MongoDB.

## ✨ Features

### Core Features
- 🎵 Stream high-quality music
- 📋 Create and manage playlists
- 🔍 Advanced song search and filtering
- 👤 User authentication and profiles
- 💚 Favorites/Liked songs
- 📜 Listen history tracking
- 🌙 Dark mode support
- 📱 Responsive design

### Technical Features
- Real-time updates with Socket.io
- JWT authentication
- RESTful API
- State management with Redux
- MongoDB database
- Docker support

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Redux** - State management
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Socket.io** - Real-time features

## 📁 Project Structure

```
musicfy/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── store/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── docs/
│   ├── API.md
│   └── DATABASE.md
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ZainulAbdin-67/musicfy.git
cd musicfy
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Frontend Setup** (in another terminal)
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Using Docker
```bash
docker-compose up --build
```

## 📚 API Documentation

See [API Documentation](./docs/API.md) for complete endpoint reference.

## 🗄️ Database Schema

See [Database Design](./docs/DATABASE.md) for detailed schema information.

## 🔐 Authentication

- JWT-based authentication
- Secure password hashing with bcryptjs
- Token refresh mechanism
- Protected API routes

## 🎨 UI/UX Highlights

- Dark theme (Spotify-inspired)
- Responsive grid layouts
- Interactive music player
- Real-time now playing updates
- Smooth transitions and hover effects

## 📝 License

MIT License - see [LICENSE](./LICENSE) file

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

**Made with ❤️ by ZainulAbdin-67**
