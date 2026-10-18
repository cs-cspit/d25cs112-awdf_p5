# Practical 5: MongoDB Integration and Schema Design with Mongoose

**Course**: Advanced Web Development Frameworks (ITUE301)  
**Student**: Bhavya Durgani &bull; **Roll No**: D25CS112  
**Department**: CSE - CSPIT, CHARUSAT  

---

## 📌 Overview
This project (`prac5`) integrates **MongoDB** with an **Express.js** backend using the **Mongoose ODM (Object Data Modeling)**. It demonstrates robust schema design, schema validation, enum restrictions, pre-save lifecycle hooks, and asynchronous database CRUD operations.

### Key Architectural Components:
- **Mongoose Task Schema (`models/Task.js`)**:
  - `title`: String, required validation, automatic whitespace trimming.
  - `description`: String, optional default empty string.
  - `completed`: Boolean, default `false`.
  - `priority`: String enum (`low`, `medium`, `high`), default `medium`.
  - `createdAt`: Date timestamp, default `Date.now`.
  - **Mongoose Pre-Save Hook**: Automatically trims title before persisting to MongoDB.
- **REST CRUD Controllers (`routes/taskRoutes.js`)**:
  - `GET /tasks`: Retrieve all tasks from MongoDB (`Task.find()`).
  - `GET /tasks/:id`: Retrieve single task by MongoDB ObjectId (`Task.findById()`).
  - `POST /tasks`: Validate and insert a new task document (`Task.create()`).
  - `PUT /tasks/:id`: Update an existing task document with schema validation (`Task.findByIdAndUpdate()`).
  - `DELETE /tasks/:id`: Delete a task document by ObjectId (`Task.findByIdAndDelete()`).
- **Middleware Pipeline**: Logger middleware, JSON body parser, 404 handler, and global error handling middleware.

---

## 🚀 Steps to Run

Follow these commands in your terminal to set up, run, and test Practical 5:

### 1. Ensure MongoDB Daemon is Running
Start your local MongoDB server (or ensure MongoDB Community service is active):
```bash
mongod
```
* Default connection URL: `mongodb://127.0.0.1:27017/taskdb`

### 2. Navigate to Practical Directory
```bash
cd prac5
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Application Server
```bash
npm start
```
* The server will connect to MongoDB and output:
  ```text
  MongoDB connected successfully
  Server running at http://localhost:3000
  ```

### 5. Run Automated Tests (If Configured)
```bash
npm test
```

---

## 📸 Screenshots to Include in Lab File / Report

Capture and paste the following screenshots into your practical document:

1. **Screenshot 1 - Server Startup & MongoDB Connection in Terminal**:
   - *Capture*: Terminal output showing `npm start` followed by `MongoDB connected successfully` and `Server running at http://localhost:3000`.
2. **Screenshot 2 - POST /tasks (Create Task in MongoDB)**:
   - *Capture*: Postman or Thunder Client sending `POST http://localhost:3000/tasks` with JSON payload:
     ```json
     {
       "title": "Study Mongoose Schema Design",
       "description": "Practical 5 submission for AWDF",
       "priority": "high"
     }
     ```
     Showing HTTP status `201 Created` and MongoDB returning the generated `_id`, `completed: false`, and `createdAt` timestamp.
3. **Screenshot 3 - Schema Validation Error (Missing Title)**:
   - *Capture*: Postman sending `POST /tasks` with an empty title or missing title field, showing HTTP `400 Bad Request` and Mongoose validation error message `"Title is required"`.
4. **Screenshot 4 - Schema Enum Validation Error (Invalid Priority)**:
   - *Capture*: Postman sending `POST /tasks` with `{ "title": "Test", "priority": "urgent" }`, showing HTTP `400 Bad Request` and enum error message ``urgent` is not a valid enum value for path `priority``.
5. **Screenshot 5 - GET /tasks (Retrieve Tasks from MongoDB)**:
   - *Capture*: Postman executing `GET http://localhost:3000/tasks` showing HTTP `200 OK` and an array of task documents fetched from the database.
6. **Screenshot 6 - MongoDB Compass / Shell Document Inspection**:
   - *Capture*: MongoDB Compass GUI or `mongosh` terminal displaying the `taskdb` database and `tasks` collection showing the newly inserted BSON documents with fields `_id`, `title`, `description`, `priority`, and `completed`.
7. **Screenshot 7 - PUT /tasks/:id (Update Task Completion)**:
   - *Capture*: Postman executing `PUT http://localhost:3000/tasks/<id>` with `{ "completed": true }` showing HTTP `200 OK` and updated status.
