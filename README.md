# Recipe Backend

Backend API for the Recipe application, built with **Node.js**, **Express** and **PostgreSQL**.

## Tech Stack

* Node.js
* Express
* PostgreSQL
* dotenv

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the backend root:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=recipes
DB_USER=postgres
DB_PASSWORD=your_password
```

Do not commit the `.env` file to Git.

### 3. Start the development server

```bash
npm run dev
```

The server should run on:

```text
http://localhost:3000
```

## API

### Test server

```http
GET /api/v1/test
```

### Test database connection

```http
GET /api/v1/test-db
```

## Project Structure

```text
backend/
├── src/
│   ├── routes/
│   ├── db/
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Git

The main branch is:

```text
main
```

Initial setup commit:

```text
Initial backend setup with Express and PostgreSQL
```
