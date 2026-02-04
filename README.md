# 📝 Inkly – Full Stack Blogging Platform

A full-stack blogging platform like Medium built with React, TypeScript, Hono, Prisma, and PostgreSQL.

---

## 🚀 Features

### 🔐 Authentication
- User signup & login using JWT
- Protected routes on frontend and backend
- Authorization middleware

### ✍️ Blogging
- Create, edit, and delete blogs
- Only authors can edit/delete their own posts
- Published and edited date tracking

### ❤️ Likes
- Toggle like/unlike on posts
- One like per user per blog
- Persistent like count

### 💬 Comments
- Add comments to blogs
- Fetch all comments with author details

### 🔖 Bookmarks
- Bookmark/unbookmark blogs
- Dedicated bookmarks page
- One bookmark per user per blog

### 🔍 Search
- Search blogs by title or content
- Case-insensitive search
- Debounced input for performance

---

## 🛠️ Tech Stack

**Frontend:** React, TypeScript, React Router, Axios, Tailwind CSS, Lucide Icons

**Backend:** Hono, Prisma ORM, PostgreSQL, JWT, Bcrypt, Cloudflare Workers

**Shared:** TypeScript, Zod

---

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL database

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/medium_db"
JWT_SECRET="your-secret-key"
```

Run Prisma:
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:
```env
VITE_BACKEND_URL=http://localhost:8787
```

Start server:
```bash
npm run dev
```

---

## 📚 API Endpoints

### Authentication
```
POST /api/v1/user/signup
POST /api/v1/user/signin
```

### Blogs
```
GET    /api/v1/blog
GET    /api/v1/blog/:id
POST   /api/v1/blog
PUT    /api/v1/blog/:id
DELETE /api/v1/blog/:id
```

### Engagement
```
POST /api/v1/blog/:id/like
GET  /api/v1/blog/:id/likes
POST /api/v1/blog/:id/comment
GET  /api/v1/blog/:id/comments
```

### Bookmarks
```
POST /api/v1/bookmark/:id
GET  /api/v1/bookmarks
```

### Search
```
GET /api/v1/blog/search?q=query
```

---

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Author-only edit/delete permissions
- Unique constraints on likes and bookmarks
