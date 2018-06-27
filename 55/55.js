const dayOfWeekUtil = (function () {
    'use strict';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];

    function getDayNumber(dayName) {
        for (let i = 0; i < days.length; i++) {
            if (days[i] === dayName) {
                return i + 1;
            }
        }
        return 'ERROR: NO SUCH DAY!';
    }

    function getDayName(dayNumber) {
        for (let i = 0; i < days.length; i++) {
            if (i + 1 === dayNumber) {
                return days[i];
            }
        }
        return 'ERROR: NO SUCH DAY!';
    }

    return {
        getDayNumber: getDayNumber,
        getDayName: getDayName
    };

}());

console.log(dayOfWeekUtil.getDayNumber('Shabbos'));
console.log(dayOfWeekUtil.getDayName(7));


//////////////////////////////////////////////////////


let mortgageCalculater = (function () {
    'use strict';

    let interestRate;
    let numberOfMonths;
    let principle;
    let principlePayment;
    let interestPayment;
    let monthsLeft;

    function setPrinciple(principleAmount) {
        principle = principleAmount;
    }

    function setRate(rate) {
        interestRate = rate / 100 / 12;
    }

    function years(years) {
        numberOfMonths = years * 12;
        monthsLeft = years * 12;
    }

    function calculateMonthlyPayment() {
        return (interestRate * principle) / (1 - (Math.pow((1 + interestRate), - numberOfMonths)));
    }

    function calculateMonthlyPayment2() {
        let x = (interestRate * principle) / (1 - (Math.pow((1 + interestRate), - monthsLeft)));
        principlePayment = x - (interestRate * principle);
        interestPayment = interestRate * principle;
        // return console.log('Monthly mortgage payment (excluding tax & insurance):', '$' + x.toFixed(2),
        //     '$' + principlePayment.toFixed(2), '$' + interestPayment.toFixed(2));
        return console.log('PRINCIPAL:  $' + principlePayment.toFixed(2), '\n' +
            'INTEREST:   $' + interestPayment.toFixed(2), '\n' + 'TOTAL:      $' + x.toFixed(2));
    }

    function printAllPayments() {
        for (let i = 0; i < numberOfMonths; i++) {
            console.log('Payment #' + (i + 1), ' (excluding tax & insurance):');
            calculateMonthlyPayment2();
            principle -= principlePayment;
            monthsLeft--;
        }

    }

    return {
        setPrinciple: setPrinciple,
        setRate: setRate,
        years: years,
        calculateMonthlyPayment: calculateMonthlyPayment,
        calculateMonthlyPayment2: calculateMonthlyPayment2,
        printAllPayments: printAllPayments
    };

}());

mortgageCalculater.setPrinciple(200000);
mortgageCalculater.setRate(4.25);
mortgageCalculater.years(30);
console.log('Monthly mortgage payment (excluding tax & insurance):', '$' + mortgageCalculater.calculateMonthlyPayment().toFixed(2));
// mortgageCalculater.calculateMonthlyPayment2();
mortgageCalculater.printAllPayments();


(function () {
    'use strict';

    let calculateButton = document.getElementById('calculate');
    // let resetButton = document.getElementById('reset');


    function handleClick() {
        // let output = document.getElementById('output');

        let form = document.getElementById('theForm');
        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
                alert('There are some required fields!');
                return;
            }
        }
        mortgageCalculater.setPrinciple(document.getElementById('loanAmount').value);
        mortgageCalculater.setRate(document.getElementById('rate').value);
        mortgageCalculater.years(document.getElementById('years').value);

        // output.innerHTML = 'Monthly mortgage payment (excluding tax & insurance):  $' + mortgageCalculater.calculateMonthlyPayment().toFixed(2);
        document.getElementById('output').innerHTML = 'Monthly mortgage payment (excluding tax & insurance):  $' + mortgageCalculater.calculateMonthlyPayment().toFixed(2);
    }

    function reset() {
        document.getElementById('output').innerHTML = '';
    }

    calculateButton.addEventListener('click', handleClick);
    // resetButton.addEventListener('click', reset);
    document.getElementById('reset').addEventListener('click', reset);
}());