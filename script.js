/*
    ========================================
    EXPENSE MANAGEMENT APPLICATION
    ========================================
*/


/*
    Load existing transactions
    from browser localStorage
*/

let transactions =
    JSON.parse(
        localStorage.getItem("expenseTransactions")
    ) || [];



/*
    DOM ELEMENTS
*/

const form =
    document.getElementById("transactionForm");

const titleInput =
    document.getElementById("title");

const amountInput =
    document.getElementById("amount");

const typeInput =
    document.getElementById("type");

const categoryInput =
    document.getElementById("category");

const dateInput =
    document.getElementById("date");

const list =
    document.getElementById("transactionList");

const searchInput =
    document.getElementById("search");

const filterType =
    document.getElementById("filterType");



/*
    Set today's date
*/

dateInput.value =
    new Date()
        .toISOString()
        .split("T")[0];



/*
    ========================================
    AUTOMATIC CATEGORY DETECTION
    ========================================
*/

function detectCategory(title) {

    const text =
        title.toLowerCase();


    const categories = {

        Food: [
            "food",
            "restaurant",
            "pizza",
            "burger",
            "lunch",
            "dinner",
            "breakfast",
            "grocery",
            "groceries",
            "coffee",
            "swiggy",
            "zomato"
        ],


        Transport: [
            "uber",
            "ola",
            "taxi",
            "bus",
            "train",
            "metro",
            "fuel",
            "petrol",
            "diesel",
            "travel"
        ],


        Shopping: [
            "amazon",
            "flipkart",
            "shopping",
            "clothes",
            "shoes",
            "electronics"
        ],


        Bills: [
            "electricity",
            "water",
            "internet",
            "mobile",
            "phone",
            "rent",
            "bill",
            "recharge"
        ],


        Entertainment: [
            "movie",
            "netflix",
            "spotify",
            "game",
            "gaming",
            "concert"
        ],


        Health: [
            "doctor",
            "hospital",
            "medicine",
            "pharmacy",
            "health",
            "medical"
        ],


        Education: [
            "course",
            "book",
            "college",
            "school",
            "udemy",
            "education",
            "exam"
        ],


        Salary: [
            "salary",
            "paycheck",
            "freelance",
            "income",
            "bonus"
        ]

    };


    /*
        Check title against
        category keywords
    */

    for (
        const category in categories
    ) {

        for (
            const keyword of categories[category]
        ) {

            if (
                text.includes(keyword)
            ) {

                return category;

            }

        }

    }


    return "Other";
}



/*
    ========================================
    SAVE TRANSACTIONS
    ========================================
*/

function saveTransactions() {

    localStorage.setItem(
        "expenseTransactions",
        JSON.stringify(transactions)
    );

}



/*
    ========================================
    FORMAT CURRENCY
    ========================================
*/

function formatCurrency(amount) {

    return Number(amount)
        .toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

}



/*
    ========================================
    UPDATE SUMMARY
    ========================================
*/

function updateSummary() {

    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(
        transaction => {

            if (
                transaction.type === "income"
            ) {

                totalIncome +=
                    Number(transaction.amount);

            } else {

                totalExpense +=
                    Number(transaction.amount);

            }

        }
    );


    const balance =
        totalIncome - totalExpense;


    document.getElementById(
        "income"
    ).textContent =
        formatCurrency(totalIncome);


    document.getElementById(
        "expense"
    ).textContent =
        formatCurrency(totalExpense);


    document.getElementById(
        "balance"
    ).textContent =
        formatCurrency(balance);

}



/*
    ========================================
    RENDER TRANSACTIONS
    ========================================
*/

function renderTransactions() {

    list.innerHTML = "";


    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedType =
        filterType.value;


    /*
        Filter transactions
    */

    const filteredTransactions =
        transactions.filter(
            transaction => {

                const matchesSearch =
                    transaction.title
                        .toLowerCase()
                        .includes(searchTerm) ||

                    transaction.category
                        .toLowerCase()
                        .includes(searchTerm);


                const matchesType =
                    selectedType === "all" ||

                    transaction.type === selectedType;


                return (
                    matchesSearch &&
                    matchesType
                );

            }
        );


    /*
        Empty state
    */

    if (
        filteredTransactions.length === 0
    ) {

        list.innerHTML = `

            <div class="empty-state">

                <h3>
                    No transactions found
                </h3>

                <p>
                    Add a transaction to get started.
                </p>

            </div>

        `;

        return;

    }


    /*
        Sort newest transactions first
    */

    filteredTransactions.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    /*
        Generate transaction UI
    */

    filteredTransactions.forEach(
        transaction => {

            const li =
                document.createElement("li");


            li.className =
                "transaction";


            const sign =
                transaction.type === "income"
                    ? "+"
                    : "-";


            li.innerHTML = `

                <div class="transaction-left">

                    <div class="transaction-title">

                        ${escapeHTML(
                            transaction.title
                        )}

                    </div>


                    <div class="transaction-meta">

                        <span>
                            ${transaction.date}
                        </span>

                        <span class="category">

                            ${escapeHTML(
                                transaction.category
                            )}

                        </span>

                    </div>

                </div>


                <div class="transaction-right">

                    <span
                        class="amount ${transaction.type}"
                    >

                        ${sign}
                        ₹${formatCurrency(
                            transaction.amount
                        )}

                    </span>


                    <button
                        class="delete-btn"
                        onclick="deleteTransaction(${transaction.id})"
                    >
                        Delete
                    </button>

                </div>

            `;


            list.appendChild(li);

        }
    );

}



/*
    ========================================
    ADD TRANSACTION
    ========================================
*/

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            titleInput.value.trim();


        const amount =
            Number(amountInput.value);


        const type =
            typeInput.value;


        const selectedCategory =
            categoryInput.value;


        const date =
            dateInput.value;


        /*
            Validate input
        */

        if (
            title === "" ||
            !amount ||
            amount <= 0 ||
            date === ""
        ) {

            showNotification(
                "Please enter valid transaction details."
            );

            return;

        }


        /*
            Detect category automatically
        */

        let category;


        if (
            selectedCategory === "auto"
        ) {

            category =
                detectCategory(title);

        } else {

            category =
                selectedCategory;

        }


        /*
            Create transaction object
        */

        const transaction = {

            id: Date.now(),

            title: title,

            amount: amount,

            type: type,

            category: category,

            date: date

        };


        /*
            Add transaction
        */

        transactions.push(
            transaction
        );


        /*
            Save to localStorage
        */

        saveTransactions();


        /*
            Update UI immediately
        */

        updateSummary();

        renderTransactions();


        /*
            Reset form
        */

        form.reset();


        dateInput.value =
            new Date()
                .toISOString()
                .split("T")[0];


        /*
            Success notification
        */

        showNotification(
            `Transaction added to ${category}.`
        );

    }
);



/*
    ========================================
    DELETE TRANSACTION
    ========================================
*/

function deleteTransaction(id) {

    const transaction =
        transactions.find(
            t => t.id === id
        );


    if (!transaction) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${transaction.title}"?`
        );


    if (!confirmed) {
        return;
    }


    /*
        Remove transaction
    */

    transactions =
        transactions.filter(
            t => t.id !== id
        );


    /*
        Save updated data
    */

    saveTransactions();


    /*
        Refresh UI
    */

    updateSummary();

    renderTransactions();


    showNotification(
        "Transaction deleted."
    );

}



/*
    ========================================
    SEARCH
    ========================================
*/

searchInput.addEventListener(
    "input",
    renderTransactions
);



/*
    ========================================
    FILTER
    ========================================
*/

filterType.addEventListener(
    "change",
    renderTransactions
);



/*
    ========================================
    NOTIFICATION
    ========================================
*/

function showNotification(message) {

    const notification =
        document.getElementById(
            "notification"
        );


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(
        () => {

            notification.classList.remove(
                "show"
            );

        },
        2500
    );

}



/*
    ========================================
    HTML ESCAPING
    ========================================
*/

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}



/*
    ========================================
    INITIALIZE APPLICATION
    ========================================
*/

updateSummary();

renderTransactions();
