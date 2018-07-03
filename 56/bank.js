var bank = (function () {
    'use strict';

    let account1 = {
        name: 'account1',
        balance: 100
    };

    let account2 = {
        name: 'account2',
        balance: 200
    };
    /* jshint -W040 */
    function addInterest(amount) {
        this.balance *= (1 + amount);
    }

    function printBalance() {
        console.log(this.name, 'Balance: $' + this.balance);

    }
    /* jshint +W040 */
    return {
        // account1: account1,
        // account2: account2,
        // addInterest: addInterest,
        account1AddInterest: addInterest.bind(account1),
        account2AddInterest: addInterest.bind(account2),
        account1Print: printBalance.bind(account1),
        account2Print: printBalance.bind(account2)
    };

}());

// bank.addInterest.call(bank.account1, 0.04);
// bank.addInterest.call(bank.account2, 0.04);
// let account2AddInterest = bank.addInterest.bind(bank.account2);
bank.account1AddInterest(0.04);
bank.account2AddInterest(0.04);
bank.account1Print();
bank.account2Print();
// console.log('account1 Balance:', '$' + bank.account1.balance);
// console.log('account2 Balance:', '$' + bank.account2.balance);