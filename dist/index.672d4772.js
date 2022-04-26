'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// Data
const account1 = {
    owner: 'Nagasaki Yuto',
    movements: [
        200,
        455.23,
        -306.5,
        25000,
        -642.21,
        -133.9,
        79.97,
        1300
    ],
    interestRate: 1.2,
    pin: 1111,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2022-02-22T17:01:17.194Z',
        '2022-02-20T23:36:17.929Z',
        '2022-02-17T10:51:36.790Z', 
    ],
    currency: 'JPY',
    locale: 'ja-JP'
};
const account2 = {
    owner: 'Jessica Davis',
    movements: [
        5000,
        3400,
        -150,
        -790,
        -3210,
        -1000,
        8500,
        -30
    ],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z', 
    ],
    currency: 'USD',
    locale: 'en-US'
};
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [
        200,
        -200,
        340,
        -300,
        -20,
        50,
        400,
        -460
    ],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-02-01T13:15:33.035Z',
        '2020-02-30T09:48:16.867Z',
        '2020-01-25T06:04:23.907Z',
        '2021-12-25T14:18:46.235Z',
        '2021-11-05T16:33:06.386Z',
        '2022-01-17T14:43:26.374Z',
        '2022-02-20T18:49:59.371Z',
        '2022-02-21T12:01:20.894Z', 
    ],
    currency: 'GBP',
    locale: 'en-GB'
};
const account4 = {
    owner: 'Pierre Jean-Luc',
    movements: [
        430,
        1000,
        700,
        50,
        90
    ],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2021-09-01T10:17:24.185Z',
        '2021-07-08T14:11:59.604Z',
        '2022-02-15T17:01:17.194Z',
        '2022-02-20T23:36:17.929Z',
        '2022-02-17T10:51:36.790Z', 
    ],
    currency: 'EUR',
    locale: 'fr-FR'
};
const accounts = [
    account1,
    account2,
    account3,
    account4
];
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
// TODO
// FUNCTIONS
const formatMovementDate = (date, locale)=>{
    const calcDaysPassed = (date1, date2)=>Math.round(Math.abs((date2 - date1) / 86400000))
    ;
    const daysPassed = calcDaysPassed(new Date(), date);
    // console.log(daysPassed);
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else return new Intl.DateTimeFormat(locale).format(date);
};
const formatCur = (value1, locale, currency)=>{
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(value1);
};
const displayMovements = (currentAccount1, sort = false)=>{
    // clear previous content
    containerMovements.innerHTML = '';
    const movs = sort ? currentAccount1.movements.slice().sort((a, b)=>a - b
    ) : currentAccount1.movements;
    movs.forEach((mov, i1)=>{
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const date = new Date(currentAccount1.movementsDates[i1]);
        const displayDate = formatMovementDate(date, currentAccount1.locale);
        const formattedMov = formatCur(mov, currentAccount1.locale, currentAccount1.currency);
        const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i1 + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
      `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
const calcDisplayBalance = (currentAccount2)=>{
    currentAccount2.balance = currentAccount2.movements.reduce((acc, mov)=>acc + mov
    );
    labelBalance.textContent = formatCur(currentAccount2.balance, currentAccount2.locale, currentAccount2.currency);
};
const calcDisplaySummary = (currentAccount3)=>{
    const incomes = currentAccount3.movements.filter((mov)=>mov > 0
    ).reduce((acc, mov)=>acc + mov
    , 0);
    labelSumIn.textContent = formatCur(incomes, currentAccount3.locale, currentAccount3.currency);
    const outgoing = currentAccount3.movements.filter((mov)=>mov < 0
    ).reduce((acc, mov)=>acc + mov
    , 0);
    labelSumOut.textContent = formatCur(Math.abs(outgoing), currentAccount3.locale, currentAccount3.currency);
    const interest1 = currentAccount3.movements.filter((mov)=>mov > 0
    ).map((deposit1)=>deposit1 * (currentAccount3.interestRate / 100)
    ).filter((interest)=>interest >= 1
    ).reduce((acc, interest)=>acc + interest
    , 0);
    labelSumInterest.textContent = formatCur(interest1, currentAccount3.locale, currentAccount3.currency);
};
const createUsernames = (accs)=>{
    accs.forEach((acc)=>{
        acc.username = acc.owner.toLowerCase().split(' ').map((name, i, _)=>name.at(0)
        ).join('');
    });
    console.log(accs);
};
createUsernames(accounts);
const updateUI = (currentAccount4)=>{
    // Display movements
    displayMovements(currentAccount4);
    // Display balance
    calcDisplayBalance(currentAccount4);
    // Display summary
    calcDisplaySummary(currentAccount4);
};
const startLogoutTimer = ()=>{
    // set time to 5mins
    let time = 90;
    const tick = ()=>{
        const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
        const sec = `${time % 60}`.padStart(2, 0);
        // in each funcion call, log the remaining time to the UI
        labelTimer.textContent = `${min}:${sec}`;
        // when time is at 0 sec, stop timer and log out
        if (time === 0) {
            clearInterval(timer1);
            // reset welcome label
            labelWelcome.textContent = 'Log in to get started';
            // clear fields
            inputLoginPin.blur();
            inputLoginUsername.value = inputLoginPin.value = '';
            inputTransferAmount.value = inputTransferTo.value = '';
            inputCloseUsername.value = inputClosePin.value = '';
            inputLoanAmount.value = '';
            // Hide UI
            containerApp.style.opacity = 0;
        }
        // decrease time by 1 sec
        time--;
    };
    // call timer every second
    tick();
    const timer1 = setInterval(tick, 1000);
    return timer1;
};
// Event Handlers
// LOGIN
let currentAccount, timer;
// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
//////////////////////////////////////
const now = new Date();
labelDate.textContent = now.toLocaleString();
btnLogin.addEventListener('click', (e)=>{
    // prevemt form from dubmitting
    e.preventDefault();
    currentAccount = accounts.find((acc)=>acc.username === inputLoginUsername.value
    );
    // console.log(currentAccount);
    if (currentAccount?.pin === +inputLoginPin.value) {
        alert(`${currentAccount.owner}, now logged in`);
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;
        // current date and time
        const now1 = new Date();
        // const locale = navigator.language;
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            // weekday: 'long',
            month: 'numeric',
            year: 'numeric'
        };
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now1);
        // labelDate.textContent = now.toLocaleString();
        // clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
        inputTransferAmount.value = inputTransferTo.value = '';
        inputCloseUsername.value = inputClosePin.value = '';
        inputLoanAmount.value = '';
        // Timer
        if (timer) clearInterval(timer);
        timer = startLogoutTimer();
        updateUI(currentAccount);
    } else alert('User with this login detail does not exist \n Enter correct username and password');
});
// TRANSFER
btnTransfer.addEventListener('click', (e)=>{
    e.preventDefault();
    const amount = +inputTransferAmount.value;
    const receiverAcc = accounts.find((acc)=>acc?.username === inputTransferTo.value
    );
    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && currentAccount.username !== receiverAcc?.username) setTimeout(()=>{
        // Doing the transfer
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        // adding transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());
        // update UI and clear fields
        updateUI(currentAccount);
        // clear timer
        clearInterval(timer);
        timer = startLogoutTimer();
        // clear fields
        inputTransferAmount.value = inputTransferTo.value = '';
        inputCloseUsername.value = inputClosePin.value = '';
        alert(`${formatCur(amount, currentAccount.locale, currentAccount.currency)} Transferred Succesfully to ${receiverAcc.owner}`);
    }, 1500);
    else alert(`Transfer Invalid`);
});
// REQUEST LOAN
btnLoan.addEventListener('click', (e)=>{
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    // if the loa amount is greater than 0, and one or more of the deposits is more than 10% of the amount
    if (amount > 0 && currentAccount.movements.some((mov)=>mov >= 0.1 * amount
    )) {
        inputLoanAmount.value = '';
        inputCloseUsername.value = inputClosePin.value = '';
        setTimeout(()=>{
            // add movement
            currentAccount.movements.push(amount);
            // adding loan request date
            const now2 = new Date();
            currentAccount.movementsDates.push(now2.toISOString());
            // update UI
            updateUI(currentAccount);
            // clear timer
            clearInterval(timer);
            timer = startLogoutTimer();
            alert(`Loan granted: ${formatCur(amount, currentAccount.locale, currentAccount.currency)}`);
        }, 3000);
    } else alert(`We cannot grant you a loan of ${formatCur(amount, currentAccount.locale, currentAccount.currency)}`);
});
// CLOSE ACCOUNT
btnClose.addEventListener('click', (e)=>{
    e.preventDefault();
    const uname = inputCloseUsername.value;
    const pwd = +inputClosePin.value;
    const accUname = accounts.find((acc)=>acc?.username === uname
    );
    if (uname === currentAccount.username && pwd === currentAccount.pin) {
        const index = accounts.findIndex((acc)=>acc.username === currentAccount.username
        );
        // show index
        console.log(index);
        // Delete account
        accounts.splice(index, 1);
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
        inputTransferAmount.value = inputTransferTo.value = '';
        inputCloseUsername.value = inputClosePin.value = '';
        inputLoanAmount.value = '';
        // Hide UI
        containerApp.style.opacity = 0;
        console.log('Deleted User');
    } else alert('Account not found');
});
// SORT VIEW
let sorted = false;
btnSort.addEventListener('click', (e)=>{
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const currencies = new Map([
    [
        'USD',
        'United States dollar'
    ],
    [
        'EUR',
        'Euro'
    ],
    [
        'GBP',
        'Pound sterling'
    ], 
]);
const movements = [
    200,
    450,
    -400,
    3000,
    -650,
    -130,
    70,
    1300
];
/////////////////////////////////////////////////
console.log('---The new .at method ---');
const arrx = [
    23,
    1,
    14
];
console.log(arrx.at(0));
console.log(arrx.at(-1));
console.log(' ');
console.log('--- ForEach method on an Array ---');
console.log(movements);
movements.forEach((mov, i2, arr)=>{
    return console.log(`${mov > 0 ? '+' : '-'} You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)} - transaction ${i2 + 1}`);
});
console.log(' ');
console.log('--- ForEach method on a Map ---');
console.log(currencies);
currencies.forEach((value2, key, map)=>{
    console.log(`${key}: ${value2}`);
});
console.log(' ');
console.log('--- ForEach method on a Set ---');
const currenciesUnique = new Set([
    'USD',
    'GDP',
    'USD',
    'EUR',
    'EUR'
]);
console.log(currenciesUnique);
currenciesUnique.forEach((value3, _, set)=>{
    console.log(`${value3}: ${value3}`);
});
// CODING CHALLENGE #1
console.log(' ');
console.log('--- CODING CHALLENGE #1 ---');
const checkDogs = (dogsJulia, dogsKate)=>{
    const dogsJuliaCorrected = dogsJulia.slice();
    dogsJuliaCorrected.splice(0, 1);
    dogsJuliaCorrected.splice(-2);
    const dogs1 = dogsJuliaCorrected.concat(dogsKate);
    dogs1.forEach((dog, i3)=>{
        dog > 3 ? console.log(`Dog number ${i3 + 1} is an adult and is ${dog} years old`) : console.log(`Dog number ${i3 + 1} is still a puppy 🐶`);
    });
};
checkDogs([
    3,
    5,
    2,
    12,
    7
], [
    4,
    1,
    15,
    8,
    3
]);
// Data Transformation methods: map, filter, reduce
console.log(' ');
console.log('--- Data Transformation methods: Map ---');
const euroToUSD = 1.1;
const movementsUSD = movements.map((mov)=>mov * euroToUSD
);
// movements.push(6000);
console.log(movements);
console.log(movementsUSD);
const movementsDesc = movements.map((mov, i4, _)=>`${mov > 0 ? '+' : '-'} You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)} - transaction ${i4 + 1}`
);
console.log(movementsDesc);
console.log(' ');
console.log('--- Data Transformation methods: Filter ---');
console.log(movements);
const deposit = movements.filter((mov)=>{
    return mov > 0;
});
console.log(deposit);
console.log(' ');
console.log('--- Data Transformation methods: Reduce ---');
// reduce method takes two args (callback function, original value of the accumulator)
// callback function takes 4 args (accumulator, currentElement, index, array)
// accumulator represents what the array boils down to
const balance = movements.reduce((accumulator, cur, i5, arr)=>{
    console.log(`Iteration ${i5 + 1}: ${accumulator} ${cur < 0 ? '-' : '+'} ${Math.abs(cur)} = ${accumulator + cur}`);
    return accumulator + cur;
}, 160);
console.log(balance);
//getting maximum value with reduce method
// movements.push(13500);
console.log(movements);
const max = movements.reduce((acc, cur, i, arr)=>acc = acc >= cur ? acc : cur
, movements[0]);
console.log(`The maximum number in the array is: ${max}`);
// using reduce to count the number of elements in the array > 1000
console.log(' ');
console.log(accounts.flatMap((acc)=>acc.movements
));
const numDeposits1000 = accounts.flatMap((acc)=>acc.movements
).reduce((count, cur)=>cur >= 1000 ? ++count : count
, 0);
console.log(`The number of elements in the array > 1000 is: ${numDeposits1000}`);
// using reduce to return an object as the value
const { deposits , withdrawals  } = accounts.flatMap((acc)=>acc.movements
).reduce((sums, cur)=>{
    sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
    // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
    return sums;
}, {
    deposits: 0,
    withdrawals: 0
});
console.log(`Total Deposits: ${deposits}€, Total Withdrawals: ${withdrawals}€`);
// CODING CHALLENGE #2
console.log(' ');
console.log('--- CODING CHALLENGE #2 ---');
const testAgeAlpha = [
    5,
    2,
    4,
    1,
    15,
    8,
    3
];
const testAgeBeta = [
    16,
    6,
    10,
    5,
    6,
    1,
    4
];
const calcAverageHumanAge = (ages)=>{
    const humanAges = ages.map((age)=>age <= 2 ? 2 * age : 16 + age * 4
    );
    console.log(`Dog age in human age - [${humanAges.join(', ')}]`);
    const adultDogs = humanAges.filter((age)=>age >= 18
    );
    console.log(`Age of adult dogs - [${adultDogs.join(', ')}]`);
    const babyDogs = humanAges.filter((age)=>age <= 18
    );
    console.log(`Age of baby dogs - [${babyDogs.join(', ')}]`);
    const average = adultDogs.reduce((acc, age, i, arr1)=>acc + age / arr1.length
    , 0);
    console.log(`Average age of adult dogs: ${Math.round(average)}`);
};
console.log(`Test Data Alpha - [${testAgeAlpha.join(', ')}]`);
calcAverageHumanAge(testAgeAlpha);
console.log('');
console.log(`Test Data Beta - [${testAgeBeta.join(', ')}]`);
calcAverageHumanAge(testAgeBeta);
console.log(' ');
console.log('--- Magic of Chaining Methods ---');
// Pipeline
const totalDepositsUSD = movements.filter((mov)=>mov > 0
).map((mov)=>mov * euroToUSD
).reduce((acc, mov)=>acc + mov
, 0);
console.log(totalDepositsUSD);
console.log(' ');
console.log('--- Find Method ---');
const firstWithdrawl = movements.find((mov)=>mov < 0
);
console.log(movements);
console.log(`First negative element in the array: ${firstWithdrawl}`);
console.log(accounts);
const account = accounts.find((acc)=>acc.owner === 'Jessica Davis'
);
console.log(account);
console.log(' ');
console.log('--- some Method ---');
const anyDeposits = movements.some((mov)=>mov > 0
);
console.log(`Is any element in the array > 0: ${anyDeposits}`);
console.log(' ');
console.log('--- every Method ---');
const everyDeposits = movements.every((mov)=>mov > 0
);
console.log(`Is every element in the array > 0: ${everyDeposits}`);
console.log(' ');
console.log('--- flat Method ---');
const arr = [
    [
        1,
        2,
        3
    ],
    [
        4,
        5,
        6
    ],
    7,
    8
];
const newArr = arr.flat(); // only goes one-level deep when flatening arrays, unless you specify level of depth as arg
console.log(newArr);
const arrDeep = [
    [
        [
            1,
            2
        ],
        3
    ],
    [
        4,
        [
            5,
            6
        ]
    ],
    7,
    8
];
const newArrDeep = arrDeep.flat(2);
// calculate the average or total balance of all the clients
const overallBalanceAlpha = accounts.map((acc)=>acc.movements
).flat().reduce((acc, cur, i, _)=>acc + cur
, 0);
console.log(`Overall Balance (Method - array.map().flat().reduce()): ${overallBalanceAlpha}`);
console.log(' ');
console.log('--- flatMap Method ---');
// flatMap combines both the flat and map method of an array
// flatMap only goes one level deep
const overallBalanceBeta = accounts.flatMap((acc)=>acc.movements
).reduce((acc, cur, i, _)=>acc + cur
, 0);
console.log(`Overall Balance (Method - array.FlatMap().reduce()): ${overallBalanceBeta}`);
console.log(' ');
console.log('--- Sorting Arrays ---');
const owners = [
    'Jonas',
    'Zach',
    'Adam',
    'Martha'
];
console.log(`Original Array: [${owners.join(', ')}]`);
console.log(`Sorted Array: [${owners.sort().join(', ')}]`); // it mutates the array
console.log(`Original Array: [${movements.join(', ')}]`);
console.log(`Sorted Array: [${movements.sort().join(', ')}]`); // .sort() workd based on strings
console.log(`Original Array: [${movements.join(', ')}]`);
// sorting in ascending order; return 1 if currentValue > nextValue and return -1 if a < b
console.log(`Sorted Array (Ascending Order): [${movements.sort((currentValue, nextValue)=>currentValue > nextValue ? 1 : -1
).join(', ')}]` // return 1 = swap(currentValue, nextValue) || return -1 = noSwap(currentValue, nextValue)
);
// or
// movements.sort((a, b) => a - b);
// sorting in descending order; return -1 if currentValue > nextValue and return 1 if a < b
console.log(`Sorted Array (Descending Order): [${movements.sort((currentValue, nextValue)=>currentValue > nextValue ? -1 : 1
).join(', ')}]` // return 1 = swap(currentValue, nextValue) || return -1 = noSwap(currentValue, nextValue)
);
// or
// movements.sort((a, b) => b - a);
console.log(' ');
console.log('--- Generating Arrays ---');
const x = new Array(7);
console.log(x);
// Filling array x
x.fill(Math.trunc(Math.random() * 9) + 1, 0, 2); // fill the array with a random number (0-9) from index 0 - 1 (positing 1 - 2)
console.log(x);
x.fill(Math.trunc(Math.random() * 9) + 1, 2, 3); // fill the array with a random number (0-9) from index 2 - 2 ( at positing 3)
console.log(x);
x.fill(Math.trunc(Math.random() * 9) + 1, 3, 5); // fill the array with a random number (0-9) from position 4 - 5
console.log(x);
x.fill(6, 5, 6); // fill the array with the number 6 at position 6
console.log(x);
x.fill(7, 6); // fill the array with the number 7 at position 7
console.log(x);
console.log(' ');
const y = new Array(9);
console.log(y);
for (const [i, value] of y.entries()){
    y.fill(Math.trunc(Math.random() * 9) + 1);
    console.log(`Position ${i + 1}, value is : ${value}`);
}
console.log(' ');
const z = Array.from({
    length: 5
}, ()=>Math.trunc(Math.random() * 9) + 1
);
z.forEach((val, i6, _)=>{
    console.log(`Position ${i6 + 1}: ${val}`);
});
console.log(' ');
// generating an array containing elements from 1 - 10 (in that order)
const ar3 = Array.from({
    length: 10
}, (_, i7)=>i7 + 1
);
console.log(`Generating an Array, containing elements [${ar3.join(', ')}] in an ascending order`);
console.log(' ');
labelBalance.addEventListener('click', ()=>{
    const movementsUI = Array.from(document.querySelectorAll('.movements__value'), (el)=>+el.textContent.replace('€', '')
    );
    console.log(movementsUI);
// OR USE THE SPREAD OPERATOR - to turn the NodeList into an array
// const movementsUI = [...document.querySelectorAll('movements__value')];
// console.log(movementsUI);
});
console.log('');
console.log('--- Creating a function for creating Title Case ---');
const convertTitleCase = (title)=>{
    const capitalize = (str)=>str[0].toUpperCase() + str.slice(1)
    ;
    const excecptions = [
        'a',
        'am',
        'an',
        'but',
        'for',
        'in',
        'is',
        'it',
        'of',
        'on',
        'or',
        'the',
        'to',
        'we',
        'who',
        'with', 
    ];
    const titleCase = title.toLowerCase().split(' ').map((word)=>!excecptions.includes(word) ? capitalize(word) : word
    ).join(' ');
    return capitalize(titleCase);
};
const examples = [
    'here is an example of title case',
    'and here we have, another example',
    'one of the best ways a person can eat an apple on a warm day, with peak satisafaction is to drink it in a smoothie',
    'creating a function for creating title case',
    'i am a boy who likes to code but oftens get tired of it', 
];
console.log(`Old sentence: ${examples[0]}`);
console.log(`New sentence: ${convertTitleCase(examples[0])}`);
console.log(' ');
console.log(`Old sentence: ${examples[1]}`);
console.log(`New sentence: ${convertTitleCase(examples[1])}`);
console.log(' ');
console.log(`Old sentence: ${examples[2]}`);
console.log(`New sentence: ${convertTitleCase(examples[2])}`);
console.log(' ');
// coding challenge #4
console.log('--- Coding Challenge #4 --- ');
const dogs = [
    {
        weight: 22,
        curFood: 250,
        owners: [
            'Alice',
            'Bob'
        ]
    },
    {
        weight: 8,
        curFood: 200,
        owners: [
            'Matilda'
        ]
    },
    {
        weight: 13,
        curFood: 275,
        owners: [
            'Sarah',
            'John'
        ]
    },
    {
        weight: 32,
        curFood: 340,
        owners: [
            'Michael'
        ]
    }, 
];
// 1. - Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array.
dogs.forEach((dog)=>dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)
);
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
const dogSarah = dogs.find((dog)=>dog.owners.includes('Sarah')
);
console.log(dogSarah);
console.log(`Sarah's dog is eating ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'}`);
// 3. Create an array containing all owners of dogs who eat too much('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
const ownersEatTooMuch = dogs.filter((dog)=>dog.curFood > dog.recFood
).flatMap((dog)=>dog.owners
);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs.filter((dog)=>dog.curFood < dog.recFood
).flatMap((dog)=>dog.owners
);
console.log(ownersEatTooLittle);
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!".
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`[${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
const eatingExact = dogs.some((dog)=>dog.curFood === dog.recFood
);
console.log(`Is there any dog eating exactly the amount of food that is recommended: ${eatingExact}`);
// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
const checkEatingOkay = (dog)=>dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
;
const eatingOkay = dogs.some(checkEatingOkay);
console.log(`Is there any dog eating an okay amount of food: ${eatingOkay}`);
// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
const dogsEatingOkay = dogs.filter(checkEatingOkay);
console.log(dogsEatingOkay);
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)
const dogCopy = dogs.slice().sort((a, b)=>a.recFood - b.recFood
);
console.log(dogCopy); ///////////////////////////////////////////////////////////////////////////////////////////////////////

//# sourceMappingURL=index.672d4772.js.map
