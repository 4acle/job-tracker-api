# Job Tracker API

A simple RESTful API built with Node.js, Express, and MySQL to manage job applications. Built for learning, testing, and portfolio development.

## Features

- Add, view, update, and delete job applications
- Track job status like "applied", "interviewing", "rejected", etc.
- Clean, testable Express structure with MySQL and environment-based config
- Basic integration tests with Jest and Supertest

## Tech Stack

- Node.js
- Express
- MySQL
- dotenv
- Jest + Supertest (for testing)

## Setup Instructions

### 🔧 Prerequisites

- Node.js
- MySQL server running locally (or Docker)
- `job_tracker` and `job_tracker_test` databases created in MySQL

### 🛠 Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/job-tracker-api.git
   cd job-tracker-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create two `.env` files:

#### `.env` (for development):
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=job_tracker
```

#### `.env.test` (for test environment):
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=job_tracker_test
```

> **Note:** Do not commit `.env` or `.env.test` — they're already ignored in `.gitignore`.

### ▶️ Running the Server

Start the server in development mode:
```bash
node server.js
```

Server will be live at `http://localhost:3000`

---

## 🧪 Running Tests

This project includes integration tests with Jest + Supertest.

Run all tests using the test database:
```bash
NODE_ENV=test npm test
```

Make sure the `job_tracker_test` database exists before running tests.

---

## Example API Routes

| Method | Endpoint        | Description           |
|--------|------------------|-----------------------|
| GET    | `/jobs`          | List all jobs         |
| POST   | `/jobs`          | Add a new job         |
| PUT    | `/jobs/:id`      | Update a job by ID    |
| DELETE | `/jobs/:id`      | Delete a job by ID    |

---

## License

MIT
