# Prompt Sharing Platform

A full-stack web application for sharing and discovering AI prompts with user authentication, dark mode, and social features.

## Features

- 🔐 User authentication (register/login)
- 📝 Create and share prompts
- 👍 Like and save prompts
- 🏷️ Tag-based organization
- 🌙 Dark mode support
- 📱 Responsive design
- 🔍 Search and filter prompts

## Tech Stack

### Frontend
- React 18
- React Router
- Axios
- Tailwind CSS
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [https://github.com/gitbasitmalik/easy-prompt.git]
cd easy-prompt
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create environment variables
Create a `.env` file in the backend directory:
```env
MONGODB_URI=your MONGOBD uurl
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start MongoDB service

6. Run the application

Backend (from backend directory):
```bash
npm run dev
```

Frontend (from frontend directory):
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Prompts
- `GET /api/auth/prompts` - Get all prompts
- `POST /api/auth/prompts` - Create new prompt
- `GET /api/auth/prompts/:id` - Get specific prompt
- `POST /api/auth/prompts/:id/like` - Like/unlike prompt
- `POST /api/auth/prompts/:id/save` - Save/unsave prompt

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
