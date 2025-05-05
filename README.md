# Job Tracker API

A simple RESTful API built with Node.js, Express, and MySQL to manage job applications.

## Features

- Add, view, update, and delete job applications
- Track status like "applied", "interviewing", "rejected", etc.
- Built for practice and portfolio purposes

## Tech Stack

- Node.js
- Express
- MySQL
- dotenv

## Setup Instructions

1. Clone the repo
2. Run `npm install` to install dependencies
3. Create a `.env` file with your database credentials:
   
    ```DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=job_tracker
5. Run the server:
    ```node index.js```
6. Use Postman or Insomnia to test routes like `GET /jobs` and `POST /jobs`

## License

MIT
