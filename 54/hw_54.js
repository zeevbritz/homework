'use strict';

//////////////////// #1

function mySome(theArray, callback) {
    for (let i = 0; i < theArray.length; i++) {
        if (callback(theArray[i])) {
            return true;
        }
    }
    return false;
}

let letters = ['a', 'B', 'c', 'D'];
let upperCaseLetters = ['Q', 'W', 'E', 'R', 'T', 'Y'];
let lowerCaseLetters = ['q', 'w', 'e', 'r', 't', 'y'];

function upperCase(letter) {
    if (letter === letter.toUpperCase()) {
        return true;
    }
    // return letter === letter.toUpperCase();
}

function lowerCase(letter) {
    if (letter !== letter.toUpperCase()) {
        return true;
    }
    // return !upperCase(letter);
}

console.log(mySome(letters, upperCase));
console.log(letters.some(upperCase));

console.log(mySome(letters, lowerCase));
console.log(letters.some(lowerCase));

console.log(mySome(upperCaseLetters, upperCase));
console.log(upperCaseLetters.some(upperCase));

console.log(mySome(upperCaseLetters, lowerCase));
console.log(upperCaseLetters.some(lowerCase));

console.log(mySome(lowerCaseLetters, upperCase));
console.log(lowerCaseLetters.some(upperCase));

console.log(mySome(lowerCaseLetters, lowerCase));
console.log(lowerCaseLetters.some(lowerCase));

///////////////////// #2

function onlyIf(theArray, test, action) {
    for (let i = 0; i < theArray.length; i++) {
        if (test(theArray[i])) {
            action(theArray[i]);
        }
    }
}

function printIt(it) {
    console.log(it);
}

onlyIf(letters, upperCase, printIt);
onlyIf(letters, lowerCase, printIt);

/////////////////// #3

letters.filter(function (letter) {
    return letter === letter.toUpperCase();
}).forEach(function (element) {
    console.log(element);
});

letters.filter(lowerCase).forEach(printIt);