# Quiz-Fever
Quiz Fever is a modular single‑page application built with JavaScript, lit-html, and page.js, designed to create, browse, solve, and manage interactive quizzes. The project integrates with Back4App (Parse Server) for user authentication, quiz storage, question management, and solution tracking.

## 🚀 Features

### 👤 Authentication
- Register with email, username, and password
- Login/logout functionality
- Session persistence using Back4App sessions

### 📚 Quiz Browser
- View all quizzes
- Search quizzes by title
- Filter quizzes by topic
- View quiz details, author info, and statistics

### 🧠 Quiz Contest Mode
- Interactive question‑by‑question solving
- Track correct answers
- Restart quiz at any time
- Only available to logged‑in users

### 📊 Quiz Results
- Summary of correct/incorrect answers
- Review wrong questions
- Stored in Back4App as user solutions

### 📝 Quiz Editor
- Create new quizzes
- Add, edit, and delete questions
- Only the quiz creator can modify their quizzes

### 👤 Profile Page
- View created quizzes
- View solved quizzes and statistics
- Public profiles available for all users

---

## 🛠️ Technologies Used

- **JavaScript (ES Modules)**
- **lit-html** – templating and rendering
- **page.js** – client‑side routing
- **Back4App / Parse Server** – backend storage
- **HTML5 & CSS3**
- **GitHub Pages** – hosting

---

## 📦 Data Models (Back4App)

### Users
```json
{
  "email": "String",
  "username": "String",
  "password": "String"
}

