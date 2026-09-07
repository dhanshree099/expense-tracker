# 💰 Expense Tracker

A modern Expense Tracker web application built with **Node.js**, **Express.js**, **MongoDB**, **EJS**, and **Chart.js**. The application helps users manage their daily expenses, visualize spending patterns, and maintain a secure personal expense dashboard.

---

## 📌 Features

### 🔐 Authentication
- User Registration (Signup)
- User Login
- Secure Password Hashing using bcryptjs
- Session-based Authentication
- Logout Functionality

### 💳 Expense Management
- Add New Expense
- Edit Existing Expense
- Delete Expense
- Search Expenses
- Expense Categories
- Custom Expense Date
- Expense Time Tracking

### 📊 Dashboard
- Total Expenses Card
- Today's Expenses Card
- Current Month Expenses Card
- Expense Table
- Expense Statistics
- Expense Charts

### 📈 Analytics
- Expense Bar Chart
- Category Wise Expense Analysis
- Monthly Expense Tracking

### 👤 User Features
- User Profile Page
- Personalized Dashboard
- Secure User Data Isolation

### 🎨 UI Features
- Modern Sidebar Navigation
- Responsive Dashboard
- Mobile Friendly Design
- Premium Card Layout
- Interactive Charts

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- EJS Templates
- Chart.js

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- Express Session
- bcryptjs

## Other Packages

- dotenv
- morgan
- body-parser

---

# 📂 Project Structure

```text
expense-tracker/
│
├── models/
│   ├── User.js
│   └── Expense.js
│
├── views/
│   ├── partials/
│   │   └── sidebar.ejs
│   │
│   ├── signup.ejs
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── add-expense.ejs
│   ├── edit-expense.ejs
│   ├── profile.ejs
│   └── summary.ejs
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/expense-tracker.git
```

```bash
cd expense-tracker
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Create Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker
PORT=3000
```

---

## 4️⃣ Start Application

```bash
npm start
```

or

```bash
node app.js
```

---

## 5️⃣ Open Browser

```text
http://localhost:3000
```

---

# 🗄️ Database Schema

## User Schema

```javascript
{
    username: String,
    password: String
}
```

---

## Expense Schema

```javascript
{
    name: String,
    amount: Number,

    category: String,

    date: {
        type: Date,
        default: Date.now
    },

    time: String,

    userId: mongoose.Schema.Types.ObjectId
}
```

---

# 🔑 Authentication Flow

## Signup

1. User enters username and password
2. Password is hashed using bcryptjs
3. User stored in MongoDB

## Login

1. User enters credentials
2. Password compared using bcrypt.compare()
3. Session created
4. User redirected to Dashboard

## Protected Routes

```javascript
function isLoggedIn(req, res, next) {

    if(req.session.userId){
        return next();
    }

    res.redirect("/login");
}
```

---

# 📊 Dashboard Features

## Expense Cards

### Total Expenses

Displays total amount spent by the user.

### Today's Expenses

Displays expenses added today.

### Current Month Expenses

Displays expenses added in current month.

---

## Expense Table

Displays:

- Expense Name
- Category
- Amount
- Date
- Time
- Actions

---

## Charts

### Bar Chart

Visual representation of expenses.

### Category Chart

Displays spending by category.

---

# 🧾 Routes

## Authentication

| Method | Route | Description |
|----------|----------|----------|
| GET | /signup | Signup Page |
| POST | /signup | Register User |
| GET | /login | Login Page |
| POST | /login | Login User |
| GET | /logout | Logout User |

---

## Dashboard

| Method | Route | Description |
|----------|----------|----------|
| GET | /dashboard | Dashboard Page |

---

## Expense Management

| Method | Route | Description |
|----------|----------|----------|
| GET | /add | Add Expense Page |
| POST | /add-expense | Create Expense |
| GET | /edit-expense/:id | Edit Expense |
| POST | /edit-expense/:id | Update Expense |
| POST | /delete-expense/:id | Delete Expense |

---

## User Profile

| Method | Route | Description |
|----------|----------|----------|
| GET | /profile | User Profile |

---

# 🔒 Security Features

- Password Hashing
- Session Authentication
- Route Protection Middleware
- User-specific Expense Access
- MongoDB Validation

---

# 🚀 Future Enhancements

- Expense Export to Excel
- Expense Export to PDF
- Dark Mode
- Budget Management
- Income Tracking
- Monthly Reports
- Category Pie Chart
- User Profile Photo
- Email Verification
- Password Reset
- Admin Dashboard
- Expense Filters

---

# 📸 Screenshots

Add screenshots here:

```text
screenshots/
├── dashboard.png
├── add-expense.png
├── login.png
├── signup.png
└── profile.png
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork Repository
2. Create Feature Branch

```bash
git checkout -b feature/new-feature
```

3. Commit Changes

```bash
git commit -m "Added New Feature"
```

4. Push Branch

```bash
git push origin feature/new-feature
```

5. Create Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Coding Circle Academy**

Developed using:

- Node.js
- Express.js
- MongoDB
- EJS
- Chart.js

---

⭐ If you found this project useful, consider giving it a star.
