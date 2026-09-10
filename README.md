# Expense Management Platform

A responsive client-side expense management application built with **HTML, CSS, and JavaScript**. The platform helps users track income and expenses, automatically categorize transactions, and maintain financial records using browser-based persistent storage.

## Features

* **Real-time Balance Calculation**

  * Automatically calculates total income, total expenses, and current balance.
  * Updates immediately whenever a transaction is added or deleted.

* **Automatic Expense Categorization**

  * Uses a rule-based keyword matching system to categorize transactions.
  * Supports categories such as Food, Transport, Shopping, Bills, Entertainment, Health, Education, Salary, and Other.

* **Persistent Local Storage**

  * Stores transaction data using the browser's `localStorage`.
  * Data remains available after refreshing or reopening the browser.

* **Transaction Management**

  * Add income and expense transactions.
  * Delete existing transactions.
  * Records transaction title, amount, type, category, and date.

* **Search and Filtering**

  * Search transactions by title or category.
  * Filter transactions by income, expenses, or all transactions.

* **Responsive UI**

  * Responsive layout for desktop, tablet, and mobile devices.
  * Simple and user-friendly transaction management interface.

* **Input Validation**

  * Prevents invalid or incomplete transaction entries.
  * Validates transaction amount and required fields.

## Tech Stack

* **HTML5** — Application structure
* **CSS3** — Responsive styling and layout
* **JavaScript (ES6)** — Application logic and DOM manipulation
* **LocalStorage API** — Persistent client-side data storage

## Project Structure

```text
expense-tracker/
│
├── index.html       # Application structure
├── style.css        # Styling and responsive layout
├── script.js        # Application logic
└── README.md        # Project documentation
```

## How It Works

### 1. Add a Transaction

The user enters:

* Transaction title
* Amount
* Transaction type
* Category
* Date

The application validates the input before creating the transaction.

### 2. Automatic Categorization

When `Auto Detect` is selected, the application analyzes the transaction title using predefined keywords.

For example:

```text
"Swiggy dinner"
        ↓
      Food
```

```text
"Uber ride"
        ↓
    Transport
```

```text
"Netflix subscription"
        ↓
  Entertainment
```

If no matching keyword is found, the transaction is assigned to:

```text
Other
```

### 3. Balance Calculation

The application calculates:

```text
Balance = Total Income - Total Expenses
```

For example:

```text
Income    = ₹30,000
Expenses  = ₹12,000
--------------------
Balance   = ₹18,000
```

### 4. Persistent Storage

Transactions are stored in the browser using:

```javascript
localStorage.setItem(
    "expenseTransactions",
    JSON.stringify(transactions)
);
```

When the application loads, the stored transactions are retrieved:

```javascript
JSON.parse(
    localStorage.getItem("expenseTransactions")
) || [];
```

This allows the user's transaction history to persist across page refreshes.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

### Navigate to the Project

```bash
cd expense-tracker
```

### Run the Application

No backend or package installation is required.

Simply open:

```text
index.html
```

in your browser.

Alternatively, use **VS Code Live Server** for local development.

## Example Transactions

| Transaction          | Type    | Category      |
| -------------------- | ------- | ------------- |
| Swiggy Dinner        | Expense | Food          |
| Uber Ride            | Expense | Transport     |
| Amazon Shopping      | Expense | Shopping      |
| Electricity Bill     | Expense | Bills         |
| Netflix Subscription | Expense | Entertainment |
| Udemy Course         | Expense | Education     |
| Monthly Salary       | Income  | Salary        |

## Limitations

This is a **client-side application** and currently does not include:

* User authentication
* Cloud/database storage
* Multi-user support
* Backend APIs
* Cross-device synchronization
* Advanced financial analytics

Transaction data is stored only in the browser's LocalStorage.

## Future Improvements

Potential improvements include:

* User authentication
* Backend API integration
* Database persistence
* Cloud synchronization
* Expense charts and dashboards
* Monthly spending reports
* Budget limits and alerts
* CSV/PDF transaction export
* More advanced categorization using machine learning
* Multi-user financial accounts

## Learning Outcomes

This project demonstrates practical experience with:

* DOM manipulation
* JavaScript event handling
* CRUD operations
* LocalStorage API
* Form validation
* Client-side data persistence
* Rule-based categorization
* Responsive web design
* Dynamic UI rendering
* Search and filtering

## Author

**Namitha R**

Computer Science & Engineering Student

---

### License

This project is open-source and available for educational and personal use.
