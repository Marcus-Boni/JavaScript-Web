const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions
        .filter(transaction =>
            transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionsIntoDOM = ({ amount, name, id }) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onCLick="removeTransaction(${id})">
        x
        </button>
    `
    transactionsUl.prepend(li)
}

const getExpenses = trasactionsAmounts => Math.abs(trasactionsAmounts
    .filter((value) => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = trasactionsAmounts => trasactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = trasactionsAmounts => trasactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () => {
    const trasactionsAmounts = transactions.map(({ amount }) => amount)
    const total = getTotal(trasactionsAmounts)
    const income = getIncome(trasactionsAmounts)
    const expense = getExpenses(trasactionsAmounts)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
    const transaction = {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount)
    }
    transactions.push(transaction)
}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSOmeInputEmpty = transactionName === '' || transactionAmount === ''
    if (isSOmeInputEmpty) {
        alert('Por favor insira corretamente os valores em seus respectivos espaços!')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)