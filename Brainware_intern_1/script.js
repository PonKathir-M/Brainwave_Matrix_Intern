const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('addTransaction');
const toggleMode = document.getElementById('toggleMode');

let isIncome = true; 
let transactions = [];

toggleMode.addEventListener('click', () => {
  isIncome = !isIncome;
  toggleMode.innerText = isIncome ? 'Mode: Income' : 'Mode: Expense';
  toggleMode.className = isIncome ? 'income-mode' : 'expense-mode';
});

addBtn.addEventListener('click', () => {
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter description and amount');
    return;
  }

  const amt = +amount.value;
  const signedAmount = isIncome ? amt : -amt;

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: signedAmount
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();

  text.value = '';
  amount.value = '';
});

function addTransactionDOM(transaction) {
  const li = document.createElement('li');
  li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  const sign = transaction.amount < 0 ? '-' : '+';
  li.innerHTML = `
    ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span>
  `;
  list.appendChild(li);
}

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const incomeTotal = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0).toFixed(2);
  const expenseTotal = Math.abs(
    amounts.filter(a => a < 0).reduce((a, b) => a + b, 0)
  ).toFixed(2);

  balance.innerText = `₹${total}`;
  income.innerText = `₹${incomeTotal}`;
  expense.innerText = `₹${expenseTotal}`;
}
