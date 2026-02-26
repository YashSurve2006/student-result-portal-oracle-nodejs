# Student Result Portal (Oracle + Node.js)

## Overview

The **Student Result Portal** is a database-driven web application developed using **Oracle Database and Node.js**. The system allows administrators to manage student records and academic results through a structured and automated process.

This project demonstrates the integration of **Oracle PL/SQL with a Node.js backend**, using stored procedures and packages for efficient database operations and REST APIs for dynamic result retrieval.

The system provides a simple interface to add students, insert marks, and view results while maintaining structured database design and secure data handling.

 

## Technologies Used

| Technology | Purpose |
|   -|   |
| Oracle Database | Data Storage |
| PL/SQL | Stored Procedures & Packages |
| Node.js | Backend Server |
| Express.js | API Development |
| HTML | Frontend Structure |
| CSS | Styling |
| JavaScript | Client-side Logic |

 

## Key Features

- Add new students to the database
- Insert student marks
- View student results dynamically
- Delete student records
- Oracle PL/SQL package implementation
- Stored procedure based operations
- REST API integration
- Structured database design
- Automatic result calculation
- Error handling and validation

 

## System Architecture

Frontend pages communicate with the **Node.js backend APIs**, which interact with the **Oracle Database using PL/SQL procedures and packages.**

```
Browser → Node.js Server → Oracle Database
```

 

## Project Structure

```
student-result-portal-oracle-nodejs
│
├── plsql
│   └── database.sql
│
├── public
│   ├── index.html
│   ├── add-students.html
│   ├── add-marks.html
│   ├── view-result.html
│   └── style.css
│
├── db.js
├── server.js
├── package.json
└── README.md
```

 

## Database Design

### STUDENT Table

| Column | Data Type |
|  -|   --|
| roll | NUMBER |
| name | VARCHAR2(50) |
| class | VARCHAR2(20) |

 

### MARKS Table

| Column | Data Type |
|  -|   --|
| roll | NUMBER |
| subject1 | NUMBER |
| subject2 | NUMBER |
| subject3 | NUMBER |

 

## PL/SQL Implementation

### Package Used

```
stud_pack
```

### Procedures Included

- add_student
- add_marks

### Database Features

- Stored Procedures
- Packages
- Joins
- Constraints
- Foreign Keys
- Commit Handling

 

## API Endpoints

### Add Student

```
POST /api/add-student
```

Adds a new student record.

 

### Add Marks

```
POST /api/add-marks
```

Adds marks for a student.

 

### View Result

```
GET /api/result/:roll
```

Retrieves student result using roll number.

 

### Delete Student

```
POST /api/delete-student
```

Deletes student and associated marks.

 

## Installation and Setup

### Step 1 — Install Requirements

Install:

- Node.js
- Oracle Database
- SQL*Plus or Oracle SQL Developer

 

### Step 2 — Install Dependencies

```
npm install
```

 

### Step 3 — Configure Database

Update database connection inside:

```
db.js
```

Example:

```
user: "username",
password: "password",
connectString: "localhost:1521/XE"
```



### Step 4 — Run Server

```
node server.js
```


### Step 5 — Open Application

Open browser:

```
http://localhost:3000
```


## Testing

The system was tested using:

- Student insertion
- Marks insertion
- Result retrieval
- Database joins
- Error handling
- Record deletion

All modules function correctly with proper database integration.


## Skills Demonstrated

- Oracle Database Design
- PL/SQL Programming
- Stored Procedures
- PL/SQL Packages
- Node.js Backend Development
- REST API Development
- Database Connectivity
- Database Normalization
- SQL Joins
- Error Handling


## Software Used

- Oracle Database XE
- SQL*Plus
- Node.js
- Express.js
- Visual Studio Code



## Future Improvements

- Login Authentication
- Result Export (PDF)
- Admin Dashboard
- Improved UI Design
- Student Login Portal


## Author

**Yash Surve**  
Computer Science Student  
Network Engineer & Software Developer
