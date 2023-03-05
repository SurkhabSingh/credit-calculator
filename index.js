let form = document.getElementById("form");
let calcButton = document.getElementById("calculate");
let amountInput = document.getElementById("amount");
let interestInput = document.getElementById("interest");
let monthsInput = document.getElementById("months");

const submitForm = (event) => {
  event.preventDefault();
  calculate();
};

const isCleanData = () => {
  let months = Number(monthsInput.value);
  let amount = Number(amountInput.value);
  let interest = Number(interestInput.value);
  let clean = true
  if (!Number(months) || !Number(amount) || !isNumber(interest)) {
    clean = false
  }
  return clean
}

const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value);
}

const calculate = () => {
  let months = Number(monthsInput.value);
  let amount = Number(amountInput.value);
  let interest = Number(interestInput.value);
  let amortization = Number(amount / months);
  if (!isCleanData()) return
  let cardPayments = []
  const percentage = interest / 100
  let remainingPayment = amount
  for (const _ of [...Array(months).keys()]) {
    const interest = Math.round((remainingPayment * percentage * 100) / 100)
    const payment = Math.round((amortization + interest))
    cardPayments.push({
      payment,
      remainingPayment,
      interest
    })
    remainingPayment = remainingPayment - payment + interest
  }
  printResults(cardPayments)
};

const printResults = (results) => { 
  let resultGrid = document.getElementsByClassName("result")?.[0];
  let tempResultsDiv = document.createElement('div')
  tempResultsDiv.classList.add('result')
