# Task Management API

[![Build Status](https://img.shields.io/badge/build-status-not_configured-lightgrey)](#)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](#)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](#)

A robust and scalable RESTful API for managing personal and team tasks using Node.js, Express, and MongoDB. This project provides a clean backend foundation for task creation, retrieval, updating, and deletion while maintaining relationships between tasks and users.

## Overview

This API is built to support modern application workflows with a simple, maintainable structure and clear separation of concerns. It follows a modular design pattern with dedicated routers, controllers, and models to keep the codebase easy to extend and maintain.

## Features

- Create, view, update, and delete tasks
- Associate each task with a registered owner user
- Persist data safely in MongoDB using Mongoose
- Support for task deadlines with `dueDate`
- Structured RESTful endpoints for frontend and third-party client integration
- Clean error handling and consistent API response patterns

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- morgan
- nodemon

## Project Setup & Installation

### Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (v18 or later recommended)
- MongoDB running locally or remotely
- npm or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd Blog-Domain-API
```

### 2. Install dependencies

```bash
npm install
```

## Project Structure

The project is organized into clear folders and files for maintainability:

```text
src/
├── Config/
│   └── db.js                # MongoDB connection setup
├── Controllers/
│   ├── postControllers.js   # Post-related request handling
│   ├── taskController.js    # Task CRUD logic
│   └── userController.js    # User-related request handling
├── Models/
│   ├── Post.js              # Post schema definition
│   ├── Task.js              # Task schema definition
│   └── User.js              # User schema definition
├── Routers/
│   ├── postRouter.js        # Post routes
│   ├── taskRouter.js        # Task routes
│   └── userRouter.js        # User routes
index.js                     # Application entry point
package.json                 # Project metadata and scripts
```

## Database Schema

The application uses three primary Mongoose schemas: User, Post, and Task.

### User Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `String` | Yes | The full name of the user. |
| `email` | `String` | Yes | Unique email address for authentication and identification. |
| `password` | `String` | Yes | Hashed password stored securely. |
| `role` | `String` | No | User role, either `User` or `Admin`. Defaults to `User`. |
| `createdAt` | `Date` | Auto | Timestamp created when the record is inserted. |
| `updatedAt` | `Date` | Auto | Timestamp updated on every modification. |

Example user payload:

```json
{
  "name": "Amina Yusuf",
  "email": "amina@example.com",
  "password": "securePassword123",
  "role": "User"
}
```

### Post Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `text` | `String` | Yes | The main content of the post. |
| `imagesUrls` | `String[]` | No | List of image URLs associated with the post. Defaults to an empty array. |
| `author` | `ObjectId` | Yes | Reference to the user who authored the post. |
| `createdAt` | `Date` | Auto | Timestamp generated on creation. |
| `updatedAt` | `Date` | Auto | Timestamp generated on update. |

Example post payload:

```json
{
  "text": "This is a sample post content.",
  "imagesUrls": ["https://example.com/image1.jpg"],
  "author": "64f1d8a4f1b45a7f0c123456"
}
```

### Task Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `String` | Yes | The task title or summary. |
| `completed` | `Boolean` | No | Indicates whether the task has been completed. Defaults to `false`. |
| `owner` | `ObjectId` | Yes | Reference to the user who owns the task. |
| `dueDate` | `Date` | No | Optional deadline for the task. |
| `createdAt` | `Date` | Auto | Timestamp generated when the task is created. |
| `updatedAt` | `Date` | Auto | Timestamp generated when the task is updated. |

Example task payload:

```json
{
  "title": "Complete API documentation",
  "completed": false,
  "owner": "64f1d8a4f1b45a7f0c123456",
  "dueDate": "2026-07-30T00:00:00.000Z"
}
```

## API Endpoints

The API exposes RESTful routes for users, posts, and tasks.

### User Endpoints

| Method | Endpoint | Description | Access Control |
| --- | --- | --- | --- |
| `GET` | `/api/v1/users` | Retrieve all users. | Public |
| `GET` | `/api/v1/users/:id` | Retrieve a single user by ID. | Public |
| `POST` | `/api/v1/users` | Create a new user. | Public |
| `PUT` | `/api/v1/users/:id` | Update an existing user by ID. | Public |
| `DELETE` | `/api/v1/users/:id` | Delete a user by ID. | Public |

### Post Endpoints

| Method | Endpoint | Description | Access Control |
| --- | --- | --- | --- |
| `GET` | `/api/v1/posts` | Retrieve all posts. | Public |
| `GET` | `/api/v1/posts/:id` | Retrieve a single post by ID. | Public |
| `POST` | `/api/v1/posts` | Create a new post. | Public |
| `PUT` | `/api/v1/posts/:id` | Update an existing post by ID. | Public |
| `DELETE` | `/api/v1/posts/:id` | Delete a post by ID. | Public |

### Task Endpoints

| Method | Endpoint | Description | Access Control |
| --- | --- | --- | --- |
| `GET` | `/api/v1/tasks` | Retrieve all tasks. | Public |
| `GET` | `/api/v1/tasks/:id` | Retrieve a single task by ID. | Public |
| `POST` | `/api/v1/tasks` | Create a new task. | Public |
| `PUT` | `/api/v1/tasks/:id` | Update an existing task by ID. | Public |
| `DELETE` | `/api/v1/tasks/:id` | Delete a task by ID. | Public |

## Example Requests

### Create a User

```http
POST /api/v1/users
Content-Type: application/json
```

```json
{
  "name": "Amina Yusuf",
  "email": "amina@example.com",
  "password": "securePassword123",
  "role": "User"
}
```

### Create a Post

```http
POST /api/v1/posts
Content-Type: application/json
```

```json
{
  "text": "This is a sample post content.",
  "imagesUrls": ["https://example.com/image1.jpg"],
  "author": "64f1d8a4f1b45a7f0c123456"
}
```

### Create a Task

```http
POST /api/v1/tasks
Content-Type: application/json
```

```json
{
  "title": "Prepare sprint review",
  "completed": false,
  "owner": "64f1d8a4f1b45a7f0c123456",
  "dueDate": "2026-07-30T00:00:00.000Z"
}
```

## 🚀 Postman Documentation

> This workspace can be used to test and validate endpoints quickly during development and integration.

[![Postman](https://img.shields.io/badge/Postman-Workspace-FF6C37?logo=postman&logoColor=white)](https://mm0036101-6648587.postman.co/workspace/e4560b75-8c58-4405-8861-c4ef98effe61/collection/50346084-7132291a-43c9-4903-8886-4ae205f45312?action=share&source=copy-link&creator=50346084)

## License

ISC License

Copyright (c) 2026

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
