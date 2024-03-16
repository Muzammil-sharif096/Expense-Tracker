let text_inp = document.querySelector("#text");
let amount_inp = document.querySelector("#amount");
let show_Data = document.querySelector("#showCard");
let Income = document.querySelector("#income");
let Expense = document.querySelector("#expense");
let Balance = document.querySelector("#balance");
let tayyab = document.querySelector("#tayyab");


function handleclk() {
    if (text_inp.value === "" || amount_inp.value === "") {
        alert("Fill in both fields");
        return;
    }
    var obj = {
        text_inp: text_inp.value,
        amount_inp: amount_inp.value,
    };
    var data = localStorage.getItem("item") ? JSON.parse(localStorage.getItem("item")) : [];
    data.push(obj);
    localStorage.setItem("item", JSON.stringify(data));
    text_inp.value = '';
    amount_inp.value = '';
    showData();
    updateBalance();
}

function showData() {
    var data = JSON.parse(localStorage.getItem("item"));
    show_Data.innerHTML = "";

    if (data == null) {
    } else {
        data.map((ele, index) => {
            ele.amount_inp > 0 ? show_Data.innerHTML += `<div class="w-11/12 font-bold tracking-widest flex justify-between items-center bg-white px-3 m-3 rounded-md shadow-md px-2 py-4 border-r-8 border-green-500">
            <div>Item : ${ele.text_inp}</div>
            <div>Amount : ${ele.amount_inp}</div>
            <button onclick='handledel(${index})'><i class="fa-solid fa-trash text-red-700 "></i></button>
            </div>` : show_Data.innerHTML += `<div class="w-11/12 font-bold tracking-widest flex justify-between items-center bg-white px-3 m-3 rounded-md shadow-md px-2 py-4 border-r-8 border-red-500">
            <div>Item : ${ele.text_inp}</div>
            <div id= "tayyab">Amount : ${ele.amount_inp}</div>
            <button onclick='handledel(${index})'><i class="fa-solid fa-trash text-red-700 "></i></button>
            </div>`
        });
    }
}

showData();
function handledel(index) {
    var data = JSON.parse(localStorage.getItem("item"));
    data.splice(index, 1)
    localStorage.setItem("item", JSON.stringify(data));
    showData();
    updateBalance();
}

function updateBalance() {
    var data = JSON.parse(localStorage.getItem("item"));
    let totalIncome = 0;
    let totalExpense = 0;

    if (data == null) {
    } else {
        data.forEach((ele) => {
            let amount = parseFloat(ele.amount_inp);
            if (amount > 0) {
                totalIncome = totalIncome + amount;
            }
            else {
                totalExpense = totalExpense + amount;
            }
        });
    }
    Income.innerHTML = `$${totalIncome.toFixed(2)}`;
    Expense.innerHTML = `$${totalExpense.toFixed(2)}`;
    Balance.innerHTML = `$${(totalIncome + totalExpense).toFixed(2)}`;
}
updateBalance();



