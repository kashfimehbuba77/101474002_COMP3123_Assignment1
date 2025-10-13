COMP3123 Assignment 1 

Project: Node.js + Express + MongoDB backend for user and employee management.

Features:

User signup & login with hashed passwords

CRUD operations for employees (create, read, update, delete)

Data validation & unique email checks

JSON-formatted API responses

Technologies: Node.js, Express, MongoDB, Mongoose, bcryptjs, Postman, Git/GitHub

Server:

Default URL: http://localhost:3001/

MongoDB database: comp3123_assigment1

Key Endpoints:

POST /api/v1/user/signup – create user

POST /api/v1/user/login – login user

GET /api/v1/emp/employees – list employees

POST /api/v1/emp/employees – create employee

GET /api/v1/emp/employees/:eid – employee details

PUT /api/v1/emp/employees/:eid – update employee

DELETE /api/v1/emp/employees/:eid – delete employee

Testing:

Use Postman for all endpoints

Validate responses, status codes, and errors

GitHub Repo: https://github.com/kashfimehbuba77/101474002_COMP3123_Assignment1

Notes:

_id auto-generated; do not include in POST/PUT requests

Passwords are hashed; login requires exact email/password

Unique emails enforced for users & employees